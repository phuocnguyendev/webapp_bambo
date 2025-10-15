import { Spin } from "@/components/ui/spin";
import MainLayout from "@/components/Layout/MainLayout";
import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { Outlet } from "react-router-dom";
import ErrorFallback from "@/components/ErrorFallback";

const CourseRoutes = lazy(() => import("@/features/Course/routes"));

const PrivateLayoutWrapper = () => (
  <MainLayout>
    <Suspense fallback={<Spin />}>
      <Outlet />
    </Suspense>
  </MainLayout>
);

const PrivateRoutes: RouteObject[] = [
  {
    path: "",
    element: <PrivateLayoutWrapper />,
    errorElement: <ErrorFallback />,
    children: [
      {
        path: "course/*",
        element: <CourseRoutes />,
        errorElement: <ErrorFallback />,
      },
    ],
  },
];

export default PrivateRoutes;
