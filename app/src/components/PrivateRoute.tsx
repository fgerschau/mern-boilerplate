import React, { FC } from 'react';
import { useUserStore } from '#/store/useStores';
import { RouteProps, Redirect, Route } from 'react-router-dom';

const PrivateRoute: FC<RouteProps> = (props) => {
  const userStore = useUserStore();
  let foo;

  return userStore.isLoggedIn ? <Route foo={foo} {...props} /> : <Redirect to="/login" />;
};

export default PrivateRoute;
