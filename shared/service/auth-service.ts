import { getData, postData } from "./base-service"

export const AuthService = {
  login(payload: string) {
    return postData('login', undefined, [{
      key: 'auth', value: payload
    }]);
  },
  
  logout() {
    return postData('logout');
  },
  
  getProfile() {
    return getData('profile');
  }
}