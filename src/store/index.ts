import EventBus from '../modules/EventBus';
import reducers from './reducers';

import {
  Indexed,
  TStore,
} from './types';

export const defaultState = {
  user: null,
  chatUsers: [],
  chats: [],
  messages: [],
  socket: null,
  chatId: null,
  token: '',
  searchUsers: [],
  showUserAffect: false,
  showSearchUser: false,
};

class Store extends EventBus {
  private state: Indexed = {};

  static _instance: any;

  reducer: any;

  constructor(defaultParams: TStore) {
    if (Store._instance) {
      return Store._instance;
    }

    super();

    this.state = defaultParams;
  }

  public getState() {
    return this.state;
  }

  public dispatch(action) {
    this.state = reducers(this.state, action);

    this.emit('changed', this.getState());
  }
}

const store = new Store(defaultState);

export default store;
