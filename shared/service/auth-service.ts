import { getData, postData } from "./base-service"

export const AuthService = {
  login(payload: string) {
    return postData('auth/login', undefined, [{
      key: 'auth', value: payload
    }]);
  },
  
  logout() {
    return postData('auth/logout');
  },
  
  getProfile() {
    return getData('profile');
  }
}