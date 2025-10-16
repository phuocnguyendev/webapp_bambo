import ErrorFallback from "@/components/ErrorFallback";
import { path } from "@/constants/path";
import { useAuthContext } from "@/features/Auth/hooks/useAuthContext";
import { Navigate } from "react-router-dom";

const NotFoundHandler = () => {
  const { isAuthenticated, isAuthChecked } = useAuthContext();

  if (!isAuthChecked) return <ErrorFallback />;
  if (!isAuthenticated) return <Navigate to={path.login} replace />;

  return <ErrorFallback />;
};

export default NotFoundHandler;
