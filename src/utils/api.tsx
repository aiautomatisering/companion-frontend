import axios, { AxiosError, AxiosRequestHeaders } from 'axios';

// Utils
import { configuration } from '../config';
export interface ApiError extends AxiosError {
  statusCode?: number;
}

export interface ApiConfig {
  token?: string;
  onSignOut?: (error: string) => void;
  onNotFound?: () => void;
  onNoAccess?: () => void;
}

const defaultConfig: ApiConfig = {
  token: '',
  onSignOut: () => null,
  onNotFound: () => null,
  onNoAccess: () => null,
};

let config: ApiConfig = {
  ...defaultConfig,
};

interface CreateAxiosInstanceProps {
  urlSufix?: string;
}
export const createAxiosInstance = ({
  urlSufix = '',
}: CreateAxiosInstanceProps) => {
  const API = axios.create({
    baseURL: `${configuration().apiUrl}${urlSufix}`,
  });

  API.interceptors.request.use((request) => {
    if (!request.headers) {
      request.headers = {} as AxiosRequestHeaders;
    }
    request.headers.Accept = 'application/json';

    const jwtToken = config.token;
    if (jwtToken) {
      // Automatically attach JWT for authenticated API requets
      request.headers.Authorization = `Bearer ${jwtToken}`;
    }

    if (request.method === 'POST' || request.method === 'PUT') {
      // Let the backend know we're sending JSON data
      request.headers['Content-Type'] = 'application/json';
    }
    return request;
  });

  API.interceptors.response.use(
    (response) => response,
    async function (error: AxiosError) {
      if (error.response?.status === 401) {
        config.onSignOut!(error.response.statusText);
      }

      if (error.response?.status === 404) {
        config.onNotFound!();
      }

      if (error.response?.status === 403) {
        config.onNoAccess!();
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorData: any = error.response?.data || {};

      const _error: ApiError = {
        ...error,
        statusCode: errorData?.status,
        message: errorData?.message || error.message,
      };
      return await Promise.reject(_error);
    }
  );
  return API;
};

export const configureAPI = (newConfig: ApiConfig): void => {
  config = { ...config, ...newConfig };
};

export default axios;
