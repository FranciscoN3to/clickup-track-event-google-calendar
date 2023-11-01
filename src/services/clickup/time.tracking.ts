import { clickupAPI } from '@providers/api';
import { AxiosResponse } from 'axios';
import { ParmsTrackTime, TrackingTime } from './types';

type Params = {
    taskId: string;
    hasCustomTaskId: boolean;
}; 

async function getTrackedTime(params: Params): Promise<AxiosResponse<TrackingTime[]>> {
  const teamId = localStorage.getItem('clickup-team-id')
  return clickupAPI.get<TrackingTime[]>(
    `api/v2/task/${params.taskId}/time/?custom_task_ids=${params.hasCustomTaskId}&team_id=${teamId}`,
  );

  // return { data, headers }
}

async function trackTime({ start, end, taskId, hasCustomTaskId }: ParmsTrackTime) {
  const teamId = localStorage.getItem('clickup-team-id')
  const userId = localStorage.getItem('clickup-user-id')
  return clickupAPI.post(
    `api/v2/team/${teamId}/time_entries?custom_task_ids=${hasCustomTaskId}&team_id=${teamId}`,
    {
      description: 'Migração do calendar',
      start: start.getTime(),
      end: end.getTime(),
      stop: end.getTime(),
      billable: true,
      assignee: Number(userId),
      tid: String(taskId),
    },
  );
}

export { getTrackedTime, trackTime };
