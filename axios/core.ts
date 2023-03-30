import axios, { AxiosRequestConfig } from 'axios';

export const createApi = () => {
  const _api = axios.create({
    baseURL: '',
  });

  _api.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error);
    }
  );

  _api.interceptors.request.use((config) => {
    return config;
  });

  return _api;
};

export interface ServerResponse<T> {
  statusCode: number;
  payload: T;
}

const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    createApi()
      .get<ServerResponse<T>>(url, config)
      .then((res) => res.data),
  post: <T>(url: string, payload?: object, config?: AxiosRequestConfig) =>
    createApi()
      .post<ServerResponse<T>>(url, payload, config)
      .then((res) => res.data),
};

export default api;
