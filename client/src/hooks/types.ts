export interface IUser {
  userEmail: string
  authToken: string
}

export interface IAuthContext {
  user: IUser,
  setUser: (user: IUser) => void
}
