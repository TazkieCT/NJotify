import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useUserStore from '../src/state/AccountState';

interface PrivateRouteProps {
  element: React.ReactElement;
  requiredRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, requiredRoles }) => {
  const { user } = useUserStore();
  const location = useLocation();

  const hasAccess = requiredRoles?.includes(user?.Role);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasAccess) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
};

export default PrivateRoute;
