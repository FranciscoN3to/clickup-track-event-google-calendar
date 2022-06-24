import { googleAPI } from "@providers/api";
import { Event, ResponseEvent } from "./types";

type Params = {
    timeMin?: string,
    timeMax?: string,
    updatedMin?: string,
    maxResults?: number,
    singleEvents?: boolean,
    orderBy?: 'startTime',
}

async function getEvents(params: Params): Promise<Event[]> {
    let nextPageToken = ''
    let data: Event[] = []
    do {

        const response = (await googleAPI.get<ResponseEvent>(`/calendar/v3/calendars/${process.env.CALENDAR_ID}/events`, {
            params: {
                ...params,
                ...(nextPageToken ? {pageToken: nextPageToken} : {}) // will get all events from calendar - this param must to be single if you want to use it
            }
        }))

        data = [...data, ...response.data.items]

        nextPageToken = response.data?.nextPageToken

    } while (nextPageToken)

    
    return (data || []).filter(item => item.status === 'confirmed').map(item => ({
        ...item,
        start: {
            ...item.start,
            dateTime: new Date(item.start.dateTime)
        },
        end: {
            ...item.end,
            dateTime: new Date(item.end.dateTime)
        },
    }))
    //.sort((a, b) => a.start.dateTime.getTime() - b.start.dateTime.getTime())
}

async function updateEvent(params: Event) {
    return googleAPI.put(`/calendar/v3/calendars/${process.env.CALENDAR_ID}/events/${params.id}`, {
        ...params,
        start: {
            ...params.start,
            dateTime: params.start.dateTime.toISOString()
        },
        end: {
            ...params.end,
            dateTime: params.end.dateTime.toISOString()
        }
    })
    
}

export { getEvents, updateEvent }