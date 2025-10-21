import ErrorFallback from "@/components/ErrorFallback";
import MainLayout from "@/components/Layout/MainLayout";
import FullPageLoading from "@/components/ui/FullPageLoading";
import { Spin } from "@/components/ui/spin";
import { path } from "@/constants/path";
import { useAuthContext } from "@/features/Auth/hooks/useAuthContext";
import { lazy, Suspense, type JSX } from "react";
import { Navigate, Outlet, type RouteObject } from "react-router-dom";

const AccountRoutes = lazy(() => import("@/features/Account/routes"));
const RoleRoutes = lazy(() => import("@/features/Role/routes"));

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isAuthChecked } = useAuthContext();
  if (!isAuthChecked) return <FullPageLoading />;
  if (!isAuthenticated) return <Navigate to={path.Login} replace />;
  return children;
};

const PrivateLayout = () => (
  <ProtectedRoute>
    <MainLayout>
      <Suspense fallback={<Spin />}>
        <Outlet />
      </Suspense>
    </MainLayout>
  </ProtectedRoute>
);

const PrivateRoutes: RouteObject[] = [
  {
    path: "",
    element: <PrivateLayout />,
    errorElement: <ErrorFallback />,
    children: [
      {
        path: path.ManagementAccount,
        element: <AccountRoutes />,
        errorElement: <ErrorFallback />,
      },
      {
        path: path.PhanQuyen,
        element: <RoleRoutes />,
        errorElement: <ErrorFallback />,
      },
      {
        path: "*",
        element: <ErrorFallback />,
      },
    ],
  },
];

export default PrivateRoutes;
