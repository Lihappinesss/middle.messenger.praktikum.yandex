import { User } from '../../store/types';

export interface SigninData{
  email: string;
  password: string;
}

export interface SignupData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string,
  phone: string;
}

export interface ChatTitle {
  title: string,
}

export interface NewUser {
  chatId: number,
  users: User[]
}

export interface ChatId {
  chatId: number
}
