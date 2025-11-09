import { Spin } from "@/components/ui/spin";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const WarehouseList = lazy(() => import("../Warehouse/pages/WarehouseList"));

const WarehouseRoutes = () => {
  return (
    <Suspense fallback={<Spin />}>
      <Routes>
        <Route index element={<WarehouseList />} />
      </Routes>
    </Suspense>
  );
};
export default WarehouseRoutes;
