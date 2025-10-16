import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/features/Auth/hooks/useAuthContext";
import ErrorFallback from "@/components/ErrorFallback";
import { path } from "@/constants/path";

const NotFoundHandler = () => {
  const { isAuthenticated, isAuthChecked } = useAuthContext();

  if (!isAuthChecked) return <ErrorFallback />; // placeholder while checking
  if (!isAuthenticated) return <Navigate to={path.login} replace />;

  return <ErrorFallback />;
};

export default NotFoundHandler;
