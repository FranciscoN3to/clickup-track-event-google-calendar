import { clickupAPI } from '@providers/api'
import { AxiosResponse } from 'axios'
import { ParmsTrackTime, TrackingTime } from './types'

type Params = {
    taskId: string
    hasCustomTaskId: boolean
}

async function getTrackedTime(params: Params): Promise<AxiosResponse<TrackingTime[]>> {
   return clickupAPI.get<TrackingTime[]>(`api/v2/task/${params.taskId}/time/?custom_task_ids=${params.hasCustomTaskId}&team_id=${process.env.CLICKUP_TEAM_Id}`)

    // return { data, headers }
}

async function trackTime({start, end, taskId, hasCustomTaskId}: ParmsTrackTime) {
    return clickupAPI.post(`api/v2/team/${process.env.CLICKUP_TEAM_Id}/time_entries?custom_task_ids=${hasCustomTaskId}&team_id=${process.env.CLICKUP_TEAM_Id}`, {
        description: "Migração do calendar",
        start: start.getTime(),
        end: end.getTime(),
        stop: end.getTime(),
        billable: true,
        assignee: Number(process.env.CLICKUP_USER_ID),
        tid: String(taskId),
    })
}

export { getTrackedTime, trackTime }