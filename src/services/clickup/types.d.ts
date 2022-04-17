
export type User = {
    id: number;
    username: string;
    email: string;
    color: string;
    initials: string;
    profilePicture?: any;
}

export type Interval = {
    id: string;
    start?: any;
    end?: any;
    time: string;
    source: string;
    date_added: string;
}

export type TrackingTime = {
    user: User;
    time: number;
    intervals: Interval[];
}

export type Params = {
    taskId: string
    hasCustomTaskId: boolean
}

export type ParmsTrackTime = Params & {
    start: Date;
    end: Date;
}