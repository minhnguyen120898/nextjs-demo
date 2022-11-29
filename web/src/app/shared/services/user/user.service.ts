import { Injectable } from '@angular/core';
import { BaseService } from '../helpers/base.service';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storageService';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class UserService extends BaseService {
  loggedIn = new BehaviorSubject(false);
  _loggedIn = this.loggedIn.asObservable();
  profileChanged = new BehaviorSubject(null);
  _profileChanged = this.profileChanged.asObservable();
  // tslint:disable-next-line: deprecation
  constructor(public httpClient: HttpClient,
    public storage: StorageService
  ) {
    super(httpClient);
    this.loggedIn.next(!!this.storage.getToken());
  }
  // USER
  getIsLoggedIn() {
    return this.loggedIn.getValue();
  }

  setToken(value : string) {
    return this.storage.setToken(value);
  }

  login(value : boolean) {
    this.loggedIn.next(value);
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.postData('logout').subscribe(
        res => {
          this.loggedIn.next(false);
          this.profileChanged.next(null);
          this.storage.removeToken();
          resolve(true);
        },
        err => {
          this.loggedIn.next(false);
          this.profileChanged.next(null);
          this.storage.removeToken();
          resolve(true);
        }
      );
    });
  }


  getProfile() {
    this.getData('user').subscribe(
      res => {
        this.profileChanged.next(res);
      },
      err => {
        this.storage.removeToken();
        this.loggedIn.next(false);
      }
    );
  }

  getProfileAsync() {
   return this.getData('user');
  }

}