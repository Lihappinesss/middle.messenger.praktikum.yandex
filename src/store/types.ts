export type User = {
  id: number;
  login: string;
  firstName: string;
  secondName: string;
  displayName: string;
  avatar: string;
  phone: string;
  email: string;
};

export interface Action {
  type: string;
  payload?: any;
}

type LastMessage = {
  content: string,
  id: number,
  time: string,
  user: User,
}

type Chats = {
  avatar: string | null,
  created_by: number
  id: number
  last_message: LastMessage | null,
  title: string,
  unread_count: number
};

type messages = {
  chat_id: number,
  content: string,
  file: File | null,
  id: number,
  is_read: boolean,
  time: string,
  type: string,
  user_id: number,
}

export type TStore = {
  user: User | null,
  chatUsers: User[] | [],
  chats: Chats[] | [],
  messages: messages[] | [],
  socket: string | null,
  chatId: number | null,
  token: string,
  searchUsers: User[] | [],
  showUserAffect: boolean,
  showSearchUser: boolean,
}

export type Indexed = {[key: string]: any};
