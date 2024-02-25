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