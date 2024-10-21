import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/layouts/AppLayout";
import { DashboardView } from "@/views/Dashboard/DashboardView";
import CreateProjectsView from "@/views/Dashboard/projects/CreateProjectsView";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
          <Route path="/projects/create" element={<CreateProjectsView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
