import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import ErrorFallback from "@/components/ErrorFallback";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import NotFoundHandler from "@/components/NotFoundHandler";

const combinedRoutes: RouteObject[] = [...PrivateRoutes, ...PublicRoutes];

combinedRoutes.push({ path: "*", element: <NotFoundHandler /> });

const router = createBrowserRouter(
  combinedRoutes.map((route) => ({
    ...route,
    errorElement: <ErrorFallback />,
  }))
);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
