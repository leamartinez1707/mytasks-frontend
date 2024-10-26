import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/layouts/AppLayout";
import { DashboardView } from "@/views/Dashboard/DashboardView";
import CreateProjectsView from "@/views/Dashboard/projects/CreateProjectsView";
import EditProjectView from "@/views/Dashboard/projects/EditProjectView";
import ProjectDetailView from "@/views/Dashboard/projects/ProjectDetailView";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
          <Route path="/projects/create" element={<CreateProjectsView />} />
          <Route path="/projects/:projectId/edit" element={<EditProjectView />} />
          <Route path="/projects/:projectId" element={<ProjectDetailView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
