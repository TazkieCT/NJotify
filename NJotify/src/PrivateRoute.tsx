import * as React from "react"
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useUserStore from '../src/state/AccountState';

interface PrivateRouteProps {
  element: React.ReactElement;
  requiredRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, requiredRoles }) => {
  const { user, setUser } = useUserStore();
  const location = useLocation();
  // const navigate = useNavigate();

  React.useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const hasAccess = requiredRoles?.includes(user?.Role);

  if (!user || user.Id === "") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasAccess) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
};

export default PrivateRoute;
