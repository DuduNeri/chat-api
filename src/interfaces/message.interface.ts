export interface IMessage {
  id?: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMessageResponse {
  id?: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
