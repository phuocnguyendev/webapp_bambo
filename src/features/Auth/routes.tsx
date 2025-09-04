import { Spin } from "@/components/ui/spin";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));

export default function AuthRoutes() {
  return (
    <Suspense fallback={<Spin />}>
      <Routes>
        <Route path="*" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Suspense>
  );
}
