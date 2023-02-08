import axiosClient from "./base-service"

export const AuthService = {
  login(payload: string) {
    return axiosClient.post('/login', undefined, {
      data: payload
    });
  },
  
  logout() {
    return axiosClient.post('/logout');
  },
  
  getProfile() {
    return axiosClient.get('/profile');
  }
}