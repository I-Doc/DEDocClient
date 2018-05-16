import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { AuthContext } from './AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <AuthContext.Consumer>
    {({ isAuthenticated }) => (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    )}
  </AuthContext.Consumer>
);

export default PrivateRoute;
