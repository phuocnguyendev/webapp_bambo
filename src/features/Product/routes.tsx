import { Spin } from "@/components/ui/spin";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AddClassByExcelPage from "./pages/AddProductByExcelPage";

const ProductList = lazy(() => import("../Product/pages/ProductList"));
const ProductDetailPage = lazy(
  () => import("../Product/pages/ProductDetailPage")
);

const ProductRoutes = () => {
  return (
    <Suspense fallback={<Spin />}>
      <Routes>
        <Route index element={<ProductList />} />
        <Route path="ThemMoi" element={<ProductDetailPage mode="create" />} />
        <Route path=":id" element={<ProductDetailPage mode="update" />} />
        <Route path="Excel" element={<AddClassByExcelPage />} />
      </Routes>
    </Suspense>
  );
};
export default ProductRoutes;
