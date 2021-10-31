import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import SnackbarUtils from './SnackbarUtils';

export interface IResponse<T> {
  res?: AxiosResponse<T | any>;
  error?: AxiosError<any>;
}

const getAccessToken = () => {
  let token: string;
  try {
    token = localStorage.getItem('token');
  } catch (e) {
    token = null;
  }

  return token;
};

const setAccessToken = (value: string) => {
  try {
    localStorage.setItem('token', value);
  } catch (e) {}
};

export const request = async <T>(
  path: string,
  options: AxiosRequestConfig = {},
): Promise<IResponse<T>> => {
  const url = process.env.API_URL + path;
  const { headers, ...rest } = options;
  try {
    const response = await axios({
      url,
      headers: {
        ...(headers || {}),
        Authorization: `${getAccessToken()}`,
      },
      ...rest,
    });

    return {
      res: response,
    };
  } catch (e) {
    if (e?.status === 401) {
      SnackbarUtils.error('Your session expired');
      setAccessToken(null);
    }

    SnackbarUtils.error('Something went wrong.');
    return {
      error: e,
    };
  }
};
