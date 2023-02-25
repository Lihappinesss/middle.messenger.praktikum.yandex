import BaseAPI from './BaseApi';

import { SigninData, SignupData } from './types';

class AuthApi extends BaseAPI {
  constructor() {
    super('/auth');
  }

  public signIn(user: SigninData) {
    return this.post('/signin', {
      data: JSON.stringify(user),
    });
  }

  public signUp(user: SignupData) {
    return this.post('/signup', {
      data: JSON.stringify(user),
    });
  }

  public checkAuth() {
    return this.get('/user');
  }

  public signOut() {
    return this.post('/logout');
  }
}

export default AuthApi;
