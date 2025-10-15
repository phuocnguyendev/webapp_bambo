import { Loader } from "@/components/ui/loader";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const CourseManagement = lazy(() => import("./pages/CourseManagement"));
const CourseDetailPage = lazy(() => import("./pages/CourseDetailPage"));

export default function CourseRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="" element={<CourseManagement />} />
        <Route path=":id" element={<CourseDetailPage />} />
      </Routes>
    </Suspense>
  );
}
