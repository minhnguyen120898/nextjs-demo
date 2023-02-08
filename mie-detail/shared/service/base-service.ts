import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.host,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor
axiosClient.interceptors.request.use(function (config) {
  // Get the token from local storage
  const token = localStorage.getItem('token');

  // If there is a token, add it to the header
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default axiosClient;