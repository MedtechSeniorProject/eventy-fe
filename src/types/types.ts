/**User Types */
export type LoginUser = {
    email: string,
    password: string
}

export type ValidateUser = {
    email: string,
    validationCode?: string
}

export type user = {
    accessToken: string,
    id: string,
    email: string,
    name: string
    isSuperAdmin: boolean
}

/** Events Types */
export type Event = {
    id: string,
    name: string;
    time: string;
    eventManager: string;
  };

export type EventForm = {
    name: string, 
    time: string
}

export type EventUpdateForm = {
    id: string,
    name?: string, 
    time?: string
}

export type EventAttendees = {
    id: string,
    name: string,
    time: string,
    attendees: Attendee[]
}

/**Event Manager Types */
export type EventManager = {
    name: string,
    email: string,
    password: string
}

export type EventManagerUpdateForm = {
    id: string,
    name: string,
    email: string
}

/**Attendee Types */
export type Attendee = {
    id: number,
    name: string,
    email: string,
    addedBy : string,
    attended: boolean
}

