import AuthApi from '../modules/Api/AuthApi';

import { SigninData, SignupData } from '../modules/Api/types';

import store from '../store';
import { setUser, deleteUser } from '../store/actions';

import router from '../modules/Router';

class AuthController {
  private api: AuthApi;

  constructor() {
    this.api = new AuthApi();
  }

  async fetchUser():Promise<void> {
    try {
      await this.api.checkAuth()
        .then((data) => {
          store.dispatch(setUser(data));
        });
    } catch (e) {
      console.log(e);
    }
  }

  async signUp(user: SignupData):Promise<void> {
    try {
      await this.api.signUp(user)
        .then(() => {
          router.go('/settings');
        });
    } catch (e) {
      console.log(e);
    }
  }

  async signIn(user: SigninData):Promise<void> {
    try {
      await this.api.signIn(user)
        .then(() => {
          router.go('/settings');
        });
    } catch (e) {
      console.log(e);
    }
  }

  async logout():Promise<void> {
    try {
      await this.api.signOut()
        .then(() => {
          router.go('/');
          store.dispatch(deleteUser());
        });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new AuthController();
