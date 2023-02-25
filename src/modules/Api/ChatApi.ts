import BaseAPI from './BaseApi';

import { ChatTitle, NewUser, ChatId } from './types';

export default class ChatAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  public create(data: ChatTitle) {
    return this.post('/', {
      data: JSON.stringify(data),
    });
  }

  public request() {
    return this.get('/', {});
  }

  public removeChat(chatId: ChatId) {
    return this.delete('/', {
      data: JSON.stringify(chatId),
    });
  }

  public addUserChat(data: NewUser) {
    return this.put('/users', {
      data: JSON.stringify(data),
    });
  }

  public deleteUserChat(data: ChatId) {
    return this.delete('/users', {
      data: JSON.stringify(data),
    });
  }

  public requestMessageToken(chatId: number) {
    return this.post(`/token/${chatId}`, {});
  }

  public requestChatUsers(chatId: number) {
    return this.get(`/${chatId}/users`, {});
  }
}
