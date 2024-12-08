export type AccountDto = {
    accountId: string,
    registeredDatetime: Date,
    email: string,
    name: string,
    role: typeof Role
}

export type AccountUpdateDto = {
    email: string,
    name: string,
}

const Role = {
    ADMIN: "ADMIN",
    USER: "USER",
  } as const;