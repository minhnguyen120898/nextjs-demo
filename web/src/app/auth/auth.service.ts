import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/helpers/base.service';
@Injectable()

export class AuthService extends BaseService {

  constructor(public httpClient: HttpClient

  ) {
    super(httpClient);
  }

  login(auth : string) {
    return this.postData('login', null, [{ key: 'auth', value: auth }]);
  }

  register(auth: string) {
    return this.postData('register', null, [{ key: 'auth', value: auth }]);
  }

  verifyEmail(email: string) {
    return this.getData(`user/resend-email/${email}`);
  }
}
