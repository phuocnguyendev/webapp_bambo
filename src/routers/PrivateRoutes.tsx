import { Spin } from "@/components/ui/spin";
import MainLayout from "@/components/Layout/MainLayout";
import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { Outlet } from "react-router-dom";

const CourseRoutes = lazy(() => import("@/features/course/routes"));

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
    children: [
      {
        path: "course/*",
        element: <CourseRoutes />,
      },
      {
        index: true,
        element: <CourseRoutes />,
      },
    ],
  },
];

export default PrivateRoutes;
