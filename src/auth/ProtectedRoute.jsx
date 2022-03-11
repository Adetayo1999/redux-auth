import React from 'react';
import PropTypes from 'prop-types';
import Auth from '.';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ restricted, component: Component }) {
  return Auth.isAuthenticated() && restricted ? <Navigate to="/" /> : <Component />;
}

ProtectedRoute.propTypes = {
  restricted: PropTypes.bool,
  component: PropTypes.any
};

export default ProtectedRoute;
