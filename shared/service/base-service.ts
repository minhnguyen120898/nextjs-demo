import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosClient = axios.create({
  baseURL: "",
  headers: {
    'Content-Type': 'application/json'
  }
});

interface HeadersPairs extends Record<string, any> {
  token?: string,
  locale?: string
}

const getUrlApi = () => {
  return "/api";
}

const getHeaders = (headersPair?: any): AxiosRequestConfig<any> | undefined => {
  let headers: HeadersPairs = {};

  let locale = "";
  // Check server side or browser
  if (typeof window !== 'undefined') {
    // Get the token from local storage or session storage
    locale = localStorage.getItem('locale') || "ja";

    if (headersPair) {
      headersPair.forEach((element: { key: string, value: string }) => {
        headers[element.key] = element.value;
      })
    }
  }

  // If there is a locale, add it to the header
  if (locale) {
    headers.locale = `${locale}`;
  }

  return {
    headers
  };
}

const getError = (error?: any) => {
  if (error.response.status === 102 || error.response.status === 107) {
  }

  return Promise.reject({
    message: error.response.data.message,
    code: error.response.status
  });
}

export const getData = (path?: string) => {
  console.log('base service');
  let config = getHeaders();
  return axiosClient.get(`${getUrlApi()}/${path}`, config)
    .then((response) => { 
      return response.data;
    })
    .catch((error) => {
      getError(error);
    });
}

export const postData = (path?: string, body?: any, headersPairs?: any) => {
  let config = getHeaders(headersPairs);
  return axiosClient.post(`${getUrlApi()}/${path}`, body, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      getError(error);
    });
}

export const putData = (path?: string, body?: any, headersPairs?: any) => {
  let config = getHeaders(headersPairs);
  return axiosClient.put(`${getUrlApi()}/${path}`, body, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      getError(error);
    });;
}

export const deleteData = (path?: string, headersPairs?: any) => {
  let config = getHeaders(headersPairs);
  return axiosClient.put(`${getUrlApi()}/${path}`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      getError(error);
    });;
}