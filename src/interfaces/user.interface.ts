export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserResponse {
  id?: string;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}
