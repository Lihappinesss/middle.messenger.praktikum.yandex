import AuthApi from '../modules/Api/AuthApi';

import { SigninData, SignupData } from '../modules/Api/types';

import store from '../store';
import { getUser, deleteUser } from '../store/actions';

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
          store.dispatch(getUser(data));
        });
    } catch (e) {
      router.go('/signin');
    }
  }

  async signUp(user: SignupData):Promise<void> {
    try {
      await this.api.signUp(user)
        .then(() => {
          router.go('/');
        });
    } catch (e) {
      console.log(e);
    }
  }

  async signIn(user: SigninData):Promise<void> {
    try {
      await this.api.signIn(user)
        .then(() => {
          router.go('/');
        });
    } catch (e) {
      console.log(e);
    }
  }

  async logout():Promise<void> {
    try {
      await this.api.signOut()
        .then(() => {
          router.go('/signin');
          store.dispatch(deleteUser());
        });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new AuthController();
