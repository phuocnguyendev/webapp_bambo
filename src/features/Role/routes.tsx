import { Spin } from "@/components/ui/spin";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const RoleList = lazy(() => import("../Role/pages/RoleList"));

const RoleRoutes = () => {
  return (
    <Suspense fallback={<Spin />}>
      <Routes>
        <Route index element={<RoleList />} />
      </Routes>
    </Suspense>
  );
};
export default RoleRoutes;
