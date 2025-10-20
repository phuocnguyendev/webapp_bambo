import ErrorFallback from "@/components/ErrorFallback";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import FullPageLoading from "@/components/ui/FullPageLoading";
import { path } from "@/constants/path";
import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { Outlet } from "react-router-dom";

const AuthRoutes = lazy(() => import("@/features/Auth/routes"));

const PublicLayoutWrapper = () => (
  <DefaultLayout>
    <Suspense fallback={<FullPageLoading />}>
      <Outlet />
    </Suspense>
  </DefaultLayout>
);

const PublicRoutes: RouteObject[] = [
  {
    path: path.Login,
    element: <PublicLayoutWrapper />,
    errorElement: <ErrorFallback />,
    children: [
      {
        path: "",
        element: <AuthRoutes />,
      },
    ],
  },
  {
    path: "/signup",
    element: <PublicLayoutWrapper />,
    errorElement: <ErrorFallback />,
    children: [
      {
        path: "",
        element: <AuthRoutes />,
      },
    ],
  },
];

export default PublicRoutes;
