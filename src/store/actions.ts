import { User } from './types';

export const GET_USER = 'getUser';
export const SET_USER = 'setUser';
export const DELETE_USER = 'deleteUser';
export const SET_ERROR = 'setError';

export const SET_CHATS = 'setChats';
export const ADD_CHAT = 'addChat';
export const SET_TOKEN = 'setToken';
export const SET_MESSAGES = 'setMessages';
export const SET_CHAT_ID = 'setChatId';

export const ADD_USER = 'addUser';
export const SET_SEARCH_USERS = 'setSearchUsers';
export const SET_CHAT_USERS = 'setChatUsers';

export const SET_SHOW_USER_AFFECT = 'setShowUserAffect';
export const SET_SHOW_SEARCH_USER = 'setShowSearchUser';

// User actions
export const setUser = (user: User) => ({
  type: SET_USER,
  payload: user,
});

export const deleteUser = () => ({
  type: DELETE_USER,
});

export const setError = (error: { reason: string }) => ({
  type: SET_ERROR,
  payload: error,
});

export const getUser = (user: User) => ({
  type: GET_USER,
  payload: user,
});

// Chat actions
export const addChat = (id: number) => ({
  type: ADD_CHAT,
  payload: id,
});

export const setChats = (chats: any) => ({
  type: SET_CHATS,
  payload: chats,
});

export const setToken = (id: string) => ({
  type: SET_TOKEN,
  payload: id,
});

export const setMessages = (messages: any) => ({
  type: SET_MESSAGES,
  payload: messages,
});

export const setChatId = (id: number) => ({
  type: SET_CHAT_ID,
  payload: id,
});

// Users actions
export const addUser = (userId: number) => ({
  type: ADD_USER,
  payload: userId,
});

export const setSearchUsers = (users: User | []) => ({
  type: SET_SEARCH_USERS,
  payload: users,
});

export const setChatUsers = (users: User) => ({
  type: SET_CHAT_USERS,
  payload: users,
});

export const setShowUserAffect = (value: boolean) => ({
  type: SET_SHOW_USER_AFFECT,
  payload: value,
});

export const setShowSearchUser = (value: boolean) => ({
  type: SET_SHOW_SEARCH_USER,
  payload: value,
});
