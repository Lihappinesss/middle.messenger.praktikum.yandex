import ChatAPI from '../modules/Api/ChatApi';
// import router from '../modules/Router';
import store from '../store';
import {
  setChats,
  addChat,
  setToken,
  setChatUsers,
} from '../store/actions';

import { ChatTitle, ChatId, NewUser } from '../modules/Api/types';

class ChatController {
  private api: ChatAPI;

  constructor() {
    this.api = new ChatAPI();
  }

  async create(data: ChatTitle) {
    try {
      await this.api.create(data)
        .then((chat) => {
          store.dispatch(addChat(chat.id));
          console.log('чат создан');
        });
    } catch (e) {
      console.log(e);
    }
  }

  async request() {
    try {
      await this.api.request()
        .then((chats) => {
          store.dispatch(setChats(chats.reverse()));
        });
    } catch (e) {
      console.log(e);
    }
  }

  async removeChat(data: ChatId) {
    return this.api.removeChat(data)
      .then(() => {
        this.request();
      });
  }

  async addUserChat(data: NewUser) {
    try {
      await this.api.addUserChat(data)
        .then(() => {
          console.log('Пользователь добавлен');
        });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteUserChat(data: NewUser) {
    try {
      await this.api.deleteUserChat(data)
        .then(() => {
          console.log('Пользователи удалены', 'success');
        });
    } catch (e) {
      console.log(e);
    }
  }

  async requestMessageToken(chatId: number) {
    try {
      await this.api.requestMessageToken(chatId)
        .then((auth) => {
          const { token } = auth;
          store.dispatch(setToken(token));
        });
    } catch (e) {
      console.log(e);
    }
  }

  async requestChatUsers(chatId: number) {
    try {
      await this.api.requestChatUsers(chatId)
        .then((users) => {
          store.dispatch(setChatUsers(users));
        });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new ChatController();
