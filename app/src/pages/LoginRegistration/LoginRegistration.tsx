import React, { FC, useEffect, FormEvent } from 'react';
import { Button, TextField, Typography, styled } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useLoginForm } from './hooks';
import { observer } from 'mobx-react';
import { useUserStore } from '#/store/useStores';

const Form = styled('form')(({ theme }) => ({
  marginTop: theme.spacing(5),
  display: 'flex',
  flexWrap: 'wrap',
  width: '50%',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: 'auto',
  marginBottom: theme.spacing(2),
  flex: '1 0 100%',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  flex: '1 0 100%',
}));

const ErrorComponent = styled(Typography)(() => ({
  flex: '1 0 100%',
}));

interface ILoginRegistrationProps {
  login?: boolean;
}

const Login: FC<ILoginRegistrationProps> = ({ login }) => {
  const { email, setEmail, firstName, password, setName, setPassword } = useLoginForm();

  const history = useHistory();
  const userStore = useUserStore();
  const error = userStore.error;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const onSuccess = () => history.push('/dashboard');
    if (login) {
      userStore.logIn(email, password, onSuccess);
    } else {
      userStore.register(firstName, email, password, onSuccess);
    }
  };

  useEffect(() => {
    userStore.resetError();
  }, [login]);

  return (
    <Form onSubmit={handleSubmit}>
      {!login ? (
        <StyledTextField
          value={firstName}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          label="Name"
          type="text"
          error={error?.fields?.firstName}
          variant="filled"
          required
        />
      ) : null}
      <StyledTextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        label="Email"
        type="email"
        error={error?.fields?.email}
        variant="filled"
        required
      />
      <StyledTextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        label="Password"
        type="password"
        autoComplete="on"
        error={error?.fields?.password}
        variant="filled"
        required
      />
      <StyledButton
        disabled={!email || !password}
        variant="contained"
        type="submit"
        color="primary"
      >
        Submit
      </StyledButton>
      {userStore.error?.message ? (
        <ErrorComponent color="error" variant="body1">
          {userStore.error?.message}
        </ErrorComponent>
      ) : null}
      {
        //!login ? (
        //<Typography variant="body2">
        //Already have an account? <Link to="/login">Log in here!</Link>
        //</Typography>
        //) : (
        //<Typography variant="body2">
        //Don't have an account? <Link to="/register">Register here!</Link>
        //</Typography>
        //)
      }
    </Form>
  );
};

export default observer(Login);
