import { lazy, Suspense, type JSX } from "react";
import { Navigate, Outlet, type RouteObject } from "react-router-dom";
import { Spin } from "@/components/ui/spin";
import MainLayout from "@/components/Layout/MainLayout";
import ErrorFallback from "@/components/ErrorFallback";
import { useAuthContext } from "@/features/Auth/hooks/useAuthContext";

const CourseRoutes = lazy(() => import("@/features/Course/routes"));

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuthContext();
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
      // If authenticated but route not found under private layout, show ErrorFallback
      {
        path: "*",
        element: <ErrorFallback />,
      },
    ],
  },
];

export default PrivateRoutes;
