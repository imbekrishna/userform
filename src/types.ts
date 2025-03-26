export type TUser = {
    name: string,
    email: string,
    gender: "male" | "female" | "other"
    bio?: string
}

export type TUserField = keyof TUser;