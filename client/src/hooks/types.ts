export interface IUser {
  userEmail: string
  authToken: string
  name: string
  dob: string
  address: string
}

export interface IAuthContext {
  user: IUser,
  setUser: (user: IUser) => void
}
