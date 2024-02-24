export type LoginUser = {
    email: string,
    password: string
}

export type ValidateUser = {
    email: string,
    validationCode?: string
}