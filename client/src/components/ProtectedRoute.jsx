import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, authLoading, isInitialized } = useAuth();

  if (!isInitialized || authLoading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
