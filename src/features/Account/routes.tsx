import { Spin } from "@/components/ui/spin";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const AccountList = lazy(() => import("../Account/pages/AccountList"));

export default function AccountRoutes() {
  return (
    <Suspense fallback={<Spin />}>
      <Routes>
        <Route index element={<AccountList />} />
      </Routes>
    </Suspense>
  );
}
