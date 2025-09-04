import DefaultLayout from "@/components/Layout/DefaultLayout";
import { Spin } from "@/components/ui/spin";
import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { Outlet } from "react-router-dom";

const AuthRoutes = lazy(() => import("@/features/auth/routes"));

const PublicLayoutWrapper = () => (
  <DefaultLayout>
    <Suspense fallback={<Spin />}>
      <Outlet />
    </Suspense>
  </DefaultLayout>
);

const PublicRoutes: RouteObject[] = [
  {
    path: "",
    element: <PublicLayoutWrapper />,
    children: [
      {
        path: "auth/*",
        element: <AuthRoutes />,
      },
      {
        index: true,
        element: <AuthRoutes />,
      },
    ],
  },
];

export default PublicRoutes;
