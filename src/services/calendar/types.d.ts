 

export interface DefaultReminder {
    method: string;
    minutes: number;
}

export interface Creator {
    email: string;
    self?: boolean;
    displayName: string;
}

export interface Organizer {
    email: string;
    self?: boolean;
    displayName: string;
}

export interface Start {
    dateTime: Date;
    timeZone: string;
}

export interface End {
    dateTime: Date;
    timeZone: string;
}

export interface Attendee {
    email: string;
    organizer: boolean;
    responseStatus: 'needsAction' | 'accepted' | 'declined';
    self?: boolean;
    displayName: string;
    optional?: boolean;
    comment: string;
}

export interface EntryPoint {
    entryPointType: string;
    uri: string;
    label: string;
    regionCode: string;
    pin: string;
    meetingCode: string;
    passcode: string;
}

export interface Key {
    type: string;
}

export interface ConferenceSolution {
    key: Key;
    name: string;
    iconUri: string;
}

export interface Parameters2 {
    scriptId: string;
    realMeetingId: string;
    creatorUserId: string;
    meetingUuid: string;
    meetingType: string;
    originalEventId: string;
}

export interface AddOnParameters {
    parameters: Parameters2;
}

export interface Parameters {
    addOnParameters: AddOnParameters;
}

export interface ConferenceSolutionKey {
    type: string;
}

export interface Status {
    statusCode: string;
}

export interface CreateRequest {
    requestId: string;
    conferenceSolutionKey: ConferenceSolutionKey;
    status: Status;
}

export interface ConferenceData {
    entryPoints: EntryPoint[];
    conferenceSolution: ConferenceSolution;
    conferenceId: string;
    signature: string;
    notes: string;
    parameters: Parameters;
    createRequest: CreateRequest;
}

export interface Reminders {
    useDefault: boolean;
}

export interface OriginalStartTime {
    dateTime: Date;
    timeZone: string;
}

export interface Shared {
    meetingId: string;
    meetingParams: string;
}

export interface ExtendedProperties {
    shared: Shared;
}

export interface Attachment {
    fileUrl: string;
    title: string;
    mimeType: string;
    iconLink: string;
    fileId: string;
}

export interface Event {
    kind: string;
    colorId: string,
    etag: string;
    id: string;
    status: string;
    htmlLink: string;
    created: Date;
    updated: Date;
    summary: string;
    creator: Creator;
    organizer: Organizer;
    start: Start;
    end: End;
    iCalUID: string;
    sequence: number;
    attendees: Attendee[];
    hangoutLink: string;
    conferenceData: ConferenceData;
    reminders: Reminders;
    eventType: string;
    recurrence: string[];
    recurringEventId: string;
    originalStartTime: OriginalStartTime;
    description: string;
    guestsCanModify?: boolean;
    location: string;
    extendedProperties: ExtendedProperties;
    attachments: Attachment[];
    guestsCanInviteOthers?: boolean;
    privateCopy?: boolean;
}

export interface ResponseEvent {
    kind: string;
    etag: string;
    summary: string;
    updated: Date;
    timeZone: string;
    accessRole: string;
    defaultReminders: DefaultReminder[];
    nextPageToken: string;
    items: Event[];
}


