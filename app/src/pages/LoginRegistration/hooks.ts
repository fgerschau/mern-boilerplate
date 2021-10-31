import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { validateEmail } from '#/helpers/utils';
import { request } from '#/helpers/ApiRequest';

interface ILoginFormError {
  message: string;
  fields: {
    [field: string]: boolean;
  };
}

interface ILoginBase {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (email: string) => void;
  error: ILoginFormError;
  setError: (error: ILoginFormError) => void;
  firstName: string;
  setName: (name: string) => void;
}

export const useLoginForm = (): ILoginBase => {
  const [firstName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<ILoginFormError>({
    message: '',
    fields: { email: false, password: false },
  });

  return {
    firstName,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
  };
};

export const useLoginSubmit = ({
  setError,
  email,
  password,
  setToken,
}: {
  setError: (error: ILoginFormError) => void;
  email: string;
  password: string;
  setToken: (token: string) => void;
}): ((e: React.FormEvent<HTMLFormElement>) => void) => {
  const history = useHistory();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError({
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
      const errors = errorResponse.data;
      if (errorResponse.status === 400) {
        setError({
          message: errorResponse?.data?.message || 'Some fields are not correct',
          fields: {
            email: !!errors.email,
            firstName: !!errors.firstName,
            password: !!errors.password,
          },
        });
      } else {
        setError({
          message: errors.message,
          fields: {},
        });
      }
    }

    if (response.res?.status === 200) {
      const token = response.res.data.token;

      setError({
        message: '',
        fields: {},
      });
      setToken(token);
      history.push('/dashboard');
      return;
    }
  };

  return submit;
};

export const useRegistrationSubmit = ({
  firstName,
  email,
  password,
  setError,
}: {
  firstName: string;
  email: string;
  password: string;
  setError: (error: ILoginFormError) => void;
}): ((e: React.FormEvent<HTMLFormElement>) => void) => {
  const history = useHistory();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError({
        message: 'Email not valid',
        fields: {
          email: true,
        },
      });

      return;
    }

    if (!email || !name || !password) {
      setError({
        message: 'You need to fill in all required fields.',
        fields: {
          email: !email,
          name: !name,
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
      setError(response?.res?.data?.message);
    } else {
      setError({
        message: '',
        fields: {},
      });
    }

    if (response.res?.status === 200) {
      history.push('/dashboard');
    }
  };

  return submit;
};
