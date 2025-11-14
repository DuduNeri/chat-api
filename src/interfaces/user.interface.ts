export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}
