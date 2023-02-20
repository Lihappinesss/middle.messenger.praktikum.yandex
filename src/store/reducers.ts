import {
  SET_USER,
  DELETE_USER,
  SET_ERROR,
  GET_USER,
  ADD_CHAT,
  GET_CHATS,
  SET_CHAT_ID,
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
    case GET_CHATS:
      return {
        ...state,
        chats: action.payload,
        chatId: action.payload[0].id,
      };
    case SET_CHAT_ID:
      return {
        ...state,
        chatId: action.payload,
      };
    default:
      return state;
  }
};
