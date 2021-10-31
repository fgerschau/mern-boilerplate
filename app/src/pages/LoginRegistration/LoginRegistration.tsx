import React, { FC, useEffect, FormEvent } from 'react';
import { makeStyles, Button, TextField, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useLoginForm } from './hooks';
import { observer } from 'mobx-react';
import { useUserStore } from '#/store/useStores';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexWrap: 'wrap',
    width: '50%',
  },
  input: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
    flex: '1 0 100%',
  },
  button: {
    marginBottom: theme.spacing(2),
    flex: '1 0 100%',
  },
  error: {
    flex: '1 0 100%',
  },
}));

interface ILoginRegistrationProps {
  login?: boolean;
}

const Login: FC<ILoginRegistrationProps> = ({ login }) => {
  const styles = useStyles();
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
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      {!login ? (
        <TextField
          value={firstName}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          placeholder="Name"
          label="Name"
          type="text"
          error={error?.fields?.firstName}
          required
        />
      ) : null}
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
        placeholder="Email"
        label="Email"
        type="email"
        error={error?.fields?.email}
        required
      />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
        placeholder="Password"
        label="Password"
        type="password"
        autoComplete="on"
        error={error?.fields?.password}
        required
      />
      <Button
        disabled={!email || !password}
        variant="contained"
        type="submit"
        className={styles.button}
        color="primary"
      >
        Submit
      </Button>
      {userStore.error?.message ? (
        <Typography className={styles.error} color="error" variant="body1">
          {userStore.error?.message}
        </Typography>
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
    </form>
  );
};

export default observer(Login);
