import { Spin } from "@/components/ui/spin";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const SupplierList = lazy(() => import("../Supplier/pages/SupplierList"));

const SupplierRoutes = () => {
  return (
    <Suspense fallback={<Spin />}>
      <Routes>
        <Route index element={<SupplierList />} />
      </Routes>
    </Suspense>
  );
};
export default SupplierRoutes;
