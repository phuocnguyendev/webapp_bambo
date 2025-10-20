import { Spin } from "@/components/ui/spin";
import { path } from "@/constants/path";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const LoginPage = lazy(() => import("../Auth/pages/LoginPage"));

const AuthRoutes = () => {
  return (
    <Suspense fallback={<Spin />}>
      <Routes>
        <Route path={path.Login} element={<LoginPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Suspense>
  );
};
export default AuthRoutes;
