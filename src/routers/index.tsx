import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import { useAuthContext } from "@/features/Auth/hooks/useAuthContext";
import ErrorFallback from "@/components/ErrorFallback";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

const AppRouter = () => {
  const { isAuthenticated } = useAuthContext();
  console.log("xxxxxx", isAuthenticated);

  const routes: RouteObject[] = isAuthenticated ? PrivateRoutes : PublicRoutes;

  const router = createBrowserRouter([
    ...routes.map((route) => ({
      ...route,
      errorElement: <ErrorFallback />,
    })),
  ]);
  return <RouterProvider router={router} />;
};

export default AppRouter;
