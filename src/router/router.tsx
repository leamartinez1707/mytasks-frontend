import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/layouts/AppLayout";
import { DashboardView } from "@/views/Dashboard/DashboardView";
import CreateProjectsView from "@/views/Dashboard/projects/CreateProjectsView";
import EditProjectView from "@/views/Dashboard/projects/EditProjectView";
import ProjectDetailView from "@/views/Dashboard/projects/ProjectDetailView";
import AuthLayout from "@/layouts/AuthLayout";
import LoginView from "@/views/Auth/LoginView";
import RegisterView from "@/views/Auth/RegisterView";
import ConfirmAcountView from "@/views/Auth/ConfirmAcountView";
import RequestNewCodeView from "@/views/Auth/RequestNewCodeView";
import ForgotPasswordView from "@/views/Auth/ForgotPasswordView";
import CreateNewPasswordView from "@/views/Auth/CreateNewPasswordView";
import NotFoundView from "@/views/NotFoundView";
import ProjectTeamView from "../views/Dashboard/projects/ProjectTeamView";
import ProfileView from "@/views/Profile/ProfileView";
import ChangePassword from "@/views/Profile/ChangePasswordView";
import ProfileLayout from "@/layouts/ProfileLayout";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
          <Route path="/projects/create" element={<CreateProjectsView />} />
          <Route path="/projects/:projectId/edit" element={<EditProjectView />} />
          <Route path="/projects/:projectId" element={<ProjectDetailView />} />
          <Route path="/projects/:projectId/team" element={<ProjectTeamView />} />

          <Route element={<ProfileLayout />} >
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/profile/update-password" element={<ChangePassword />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
          <Route path="/auth/confirm-account" element={<ConfirmAcountView />} />
          <Route path="/auth/request-code" element={<RequestNewCodeView />} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordView />} />
          <Route path="/auth/new-password" element={<CreateNewPasswordView />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="*" element={<NotFoundView />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
};
