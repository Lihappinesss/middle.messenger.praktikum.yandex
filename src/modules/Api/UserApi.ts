import BaseAPI from './BaseApi';

import { SignupData } from './types';

class UserApi extends BaseAPI {
  constructor() {
    super('/user');
  }

  public search(login: string) {
    return this.post('/search', {
      data: JSON.stringify({
        login,
      }),
    });
  }

  public updateProfile(data: SignupData) {
    return this.put('/profile', {
      data: JSON.stringify(data),
    });
  }

  public updateAvatar(data: FormData) {
    return this.put('/profile/avatar', {
      headers: {
      },
      data,
    });
  }
}

export default UserApi;
