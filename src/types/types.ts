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

export type event = {
    name: string,
    eventManager: string,
    time: string
}

export type EventManager = {
    name: string,
    email: string,
    password: string
}