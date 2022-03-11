import React from 'react';
import Auth from '.';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute({ component: Component }) {
  return Auth.isAuthenticated() ? <Component /> : <Navigate to="/login" />;
}

PrivateRoute.propTypes = {
  component: PropTypes.any
};

export default PrivateRoute;
