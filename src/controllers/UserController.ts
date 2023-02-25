import UserApi from '../modules/Api/UserApi';

import store from '../store';
import { setUser, setSearchUsers } from '../store/actions';
import { SignupData } from '../modules/Api/types';

class UserController {
  private api: UserApi;

  constructor() {
    this.api = new UserApi();
  }

  async search(data) {
    try {
      await this.api.search(data)
        .then((users) => store.dispatch(setSearchUsers(users)));
    } catch (e) {
      console.log(e);
    }
  }

  async updateProfile(data: SignupData) {
    try {
      await this.api.updateProfile(data)
        .then((user) => {
          store.dispatch(setUser(user));
          console.log(user, 'user');
        });
    } catch (e) {
      console.log(e);
    }
  }

  async updateAvatar(data: FormData) {
    try {
      await this.api.updateAvatar(data)
        .then((res) => {
          // store.dispatch(setUser(res));
          return res;
        });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new UserController();
