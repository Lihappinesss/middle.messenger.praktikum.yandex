import {
  SET_USER,
  DELETE_USER,
  SET_ERROR,
  GET_USER,
  ADD_CHAT,
  SET_CHATS,
  SET_TOKEN,
  SET_MESSAGES,
  SET_CHAT_ID,
  ADD_USER,
  SET_SEARCH_USERS,
  SET_SHOW_USER_AFFECT,
  SET_CHAT_USERS,
  SET_SHOW_SEARCH_USER,
} from './actions';

type Indexed = {[key: string]: any};

export interface Action {
  type: string;
  payload?: any;
}

export default (state: Indexed, action: Action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
        user: null,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        user: null,
      };
    case ADD_CHAT:
      return {
        ...state,
        chats: [...state.chats, action.payload],
      };
    case SET_CHATS:
      return {
        ...state,
        chats: action.payload,
        chatId: action.payload[0].id,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    case SET_CHAT_ID:
      return {
        ...state,
        chatId: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        chatUsers: [...state.chatUsers, action.payload],
      };
    case SET_SEARCH_USERS:
      return {
        ...state,
        searchUsers: action.payload,
      };
    case SET_CHAT_USERS:
      return {
        ...state,
        chatUsers: action.payload,
      };
    case SET_SHOW_USER_AFFECT:
      return {
        ...state,
        showUserAffect: action.payload,
      };

    case SET_SHOW_SEARCH_USER:
      return {
        ...state,
        showSearchUser: action.payload,
      };
    default:
      return state;
  }
};
