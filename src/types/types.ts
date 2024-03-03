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

export type Event = {
    id: number,
    name: string;
    time: string;
    eventManager: string;
  };

export type EventManager = {
    name: string,
    email: string,
    password: string
}

export type Attendee = {
    id: number,
    name: string,
    email: string,
    addedBy : string,
    attended: boolean
}