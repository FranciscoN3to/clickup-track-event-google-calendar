import 'dotenv/config';
import { setTokenEnv } from '@providers/auth/google';
import { DateTime } from 'luxon'
import { getEvents, updateEvent } from './services/calendar/events';
import { getTrackedTime, trackTime } from './services/clickup/time.tracking';
import Pqueue from 'p-queue'
import logger from './utils/logger';

(async () => {

    const queue = new Pqueue({concurrency: 10, interval: 2000});
    let count = 0;
    queue.on('active', () => {
        logger.info(
            `Working on item [TRACKING TIME] #${++count}.  Size: ${queue.size}  Pending: ${
                queue.pending
            }`,
        );
    })

    await setTokenEnv()
 
  
    const [start, end] = [
        DateTime.local({ zone: "utc" }).startOf('day').minus({ days: 30 }).startOf('day').toJSDate(), // start
        DateTime.local({ zone: "utc" }).startOf('day').endOf('day').toJSDate(), // end
    ]


    const eventsList = await getEvents({    
        timeMin: start.toISOString(),
        timeMax: end.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
    })
 
    const queueEvents = eventsList.filter(it => it.status === 'confirmed' && (it?.summary || '').match(/\[.*\]/g) && ((it?.attendees || []).some(at => at?.self && at.responseStatus === 'accepted') || it.creator.self)).map(event => {
      
        return async () => {
       
            const taskId = (event.summary.match(/\[.*\]/g) || [])[0].replace(/\[|\]/g, "");

            const hasCustomTaskId = taskId.includes("CX-");

            const { data: trackTimes, headers } = await getTrackedTime({
                taskId,
                hasCustomTaskId
            })

            // console.log({trackTimes})

            const userTrackedTimes = trackTimes.find(it => Number(it.user.id) === Number(process.env.CLICKUP_USER_ID))

         

            const alreadyTracked = userTrackedTimes?.intervals.some(it => {

                const start = DateTime.fromMillis(Number(it.start)).setZone('utc').minus({minutes: 3}).toJSDate()
                const end = DateTime.fromMillis(Number(it.end)).setZone('utc').plus({minutes: 3}).toJSDate()

                return start <= event.start.dateTime && end >= event.end.dateTime
        
            })

            // console.log(alreadyTracked)

            if (!alreadyTracked) {
                await trackTime({
                    hasCustomTaskId,
                    taskId,
                    start: event.start.dateTime,
                    end: event.end.dateTime,
                })

                logger.info(
                    `Tracking time for ${event.summary} - ${event.start.dateTime.toISOString()}`,
                );

                // console.log(event.start.dateTime.toISOString(), `Tracking time for ${event.summary}`)

                // edit color event on google calendar
                await updateEvent({
                    ...event,
                    colorId: '2',
                })

                 
            }else {
                logger.info(
                    `Already tracked time for ${event.summary} - ${event.start.dateTime.toISOString()}`,
                );
                // console.log(event.start.dateTime.toISOString(), `Already tracked time for ${event.summary}`)
            }
            // console.log(headers)
            const rateLimitRemaing = Number(headers["x-ratelimit-remaining"]);
            const rateLimitReset = Number(headers["x-ratelimit-reset"]);
            if (rateLimitRemaing < 10) {
              logger.info(`Pausing queue requests for ${rateLimitReset} ms`);
              queue.pause();
              setTimeout(() => {
                queue.start();
              }, rateLimitReset + 1500);
            }

       
        }
  
    })

    //TODO: add queue to async function


    await queue.addAll(queueEvents)

    // await Promise.all(queue.map(it => it()))
 
  
})()

/*TODO: 
    integrar com banco de dados
        salvar id da task do clickup
        salvar eventos no banco de dados e relacionar com a task do clickup
        salvar time tracked no banco de dados e relacionar com a task do clickup
    
    quando o evento tiver alguma alteração no google calendar, irá impactar na task do clickup

*/