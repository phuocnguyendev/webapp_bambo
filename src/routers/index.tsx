import { createBrowserRouter } from "react-router-dom";
import { getTokenFromLocalStorage } from "@/lib/auth";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
const isAuthenticated = (): boolean => {
  const { accessToken } = getTokenFromLocalStorage();
  return !!accessToken;
};

const routes = isAuthenticated() ? PrivateRoutes : PublicRoutes;

const AppRouter = createBrowserRouter(routes);

export default AppRouter;
