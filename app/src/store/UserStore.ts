import { observable, action, computed } from 'mobx';
import { validateEmail } from '#/helpers/utils';
import { request } from '#/helpers/ApiRequest';
import IError from '#/dto/IError';

class UserStore {
  @observable public token: string = localStorage.getItem('token');
  @observable public name: string;
  @observable public error: IError = null;
  @computed get isLoggedIn() {
    return !!this.token;
  }

  @action setToken = (token: string) => {
    this.token = token;
    localStorage.setItem('token', token);
  };

  @action setError = (error: IError) => {
    this.error = error;
  };

  @action resetError = () => {
    this.error = {
      message: '',
      fields: {},
    };
  };

  @action logIn = async (email: string, password: string, onSuccess?: () => void) => {
    if (!validateEmail(email)) {
      this.setError({
        message: 'Email not valid',
        fields: {
          email: true,
        },
      });

      return;
    }

    const response = await request('/login', {
      method: 'POST',
      data: {
        email,
        password,
      },
    });

    if (response.error?.isAxiosError) {
      const errorResponse = response.error.response;
      const errors = errorResponse?.data || {};
      if (errorResponse?.status === 400) {
        this.setError({
          message: errorResponse?.data?.message || 'Some fields are not correct',
          fields: {
            email: !!errors.email,
            firstName: !!errors.firstName,
            password: !!errors.password,
          },
        });
      } else {
        this.setError({
          message: errors.message,
          fields: {},
        });
      }
    }

    if (response.res?.status === 200) {
      const token = response.res.data.token;

      this.setError({
        message: '',
        fields: {},
      });
      this.setToken(token);

      if (onSuccess) {
        onSuccess();
      }
    }
  };

  @action logout = () => {
    this.token = null;
    localStorage.removeItem('token');
  };

  @action register = async (
    firstName: string,
    email: string,
    password: string,
    onSuccess?: () => void,
  ) => {
    if (!validateEmail(email)) {
      this.setError({
        message: 'Email not valid',
        fields: {
          email: true,
        },
      });

      return;
    }

    if (!email || !firstName || !password) {
      this.setError({
        message: 'You need to fill in all required fields.',
        fields: {
          email: !email,
          name: !firstName,
          password: !password,
        },
      });
    }

    const response = await request('/register', {
      method: 'POST',
      data: {
        firstName,
        email,
        password,
      },
    });

    if (response.error?.isAxiosError) {
      this.setError({
        message: response?.error?.response?.data?.message,
      });
    } else {
      this.setError({
        message: '',
        fields: {},
      });
    }

    if (response.res?.status === 200) {
      if (onSuccess) {
        onSuccess();
      }
    }
  };
}

export default UserStore;
