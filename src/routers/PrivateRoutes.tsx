import ErrorFallback from "@/components/ErrorFallback";
import MainLayout from "@/components/Layout/MainLayout";
import { Spin } from "@/components/ui/spin";
import { useAuthContext } from "@/features/Auth/hooks/useAuthContext";
import { lazy, Suspense, type JSX } from "react";
import { Navigate, Outlet, type RouteObject } from "react-router-dom";

const CourseRoutes = lazy(() => import("@/features/Course/routes"));
const AccountRoutes = lazy(() => import("@/features/Account/routes"));

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isAuthChecked } = useAuthContext();
  console.log(
    "ProtectedRoute - isAuthChecked:",
    isAuthChecked,
    "isAuthenticated:",
    isAuthenticated
  );
  if (!isAuthChecked) return <Spin />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
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
        path: "course/*",
        element: <CourseRoutes />,
        errorElement: <ErrorFallback />,
      },
      {
        path: "QuanLyTaiKhoan/*",
        element: <AccountRoutes />,
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
