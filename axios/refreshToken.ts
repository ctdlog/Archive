import axios, { AxiosError } from 'axios';

export const API = axios.create({});

type SubScribers = ((token: string) => void)[];

let isRefreshing = false;
let refreshSubscribers: SubScribers = [];

interface RegenerateTokenResponse {
  payload: {
    accessToken: string;
    accessExpire: number;
  };
}

const regenerateToken = () => {
  return API.post<RegenerateTokenResponse>('/user/refresh');
};

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    const originalRequest = config;
    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((accessToken) => {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            resolve(API(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        regenerateToken().then(({ data }) => {
          const { accessToken } = data.payload;
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          refreshSubscribers.forEach((subscriber) => subscriber(accessToken));
          refreshSubscribers = [];
          resolve(API(originalRequest));
        });
      })
        .catch((error: AxiosError) => {
          return Promise.reject(error);
        })
        .finally(() => {
          isRefreshing = false;
        });
    }

    return Promise.reject(error);
  }
);
