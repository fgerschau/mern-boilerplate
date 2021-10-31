import React, { FC } from 'react';
import { useUserStore } from '#/store/useStores';
import { RouteProps, Redirect, Route } from 'react-router-dom';

const PrivateRoute: FC<RouteProps> = (props) => {
  const userStore = useUserStore();
  return userStore.isLoggedIn ? <Route {...props} /> : <Redirect to="/login" />;
};

export default PrivateRoute;
