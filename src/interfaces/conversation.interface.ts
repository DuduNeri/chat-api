export interface IConversation {
  id?: string;
  title: string | null;
  isGroup?: boolean;
  ownerId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IConversationResponse extends IConversation {
  participants?: { id: string; name: string }[]; // participantes
  messages?: {
    id: string;
    content: string;
    sender: { id: string; name: string };
    createdAt: Date;
  }[]; // mensagens da conversa
}

