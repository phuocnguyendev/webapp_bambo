import { Spin } from "@/components/ui/spin";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const PermissionList = lazy(() => import("../Permission/pages/PermissionList"));

const PermissionRoutes = () => {
  return (
    <Suspense fallback={<Spin />}>
      <Routes>
        <Route index element={<PermissionList />} />
      </Routes>
    </Suspense>
  );
};
export default PermissionRoutes;
