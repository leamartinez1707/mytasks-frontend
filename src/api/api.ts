import { dashboardProjectSchema, Project, ProjectFormData } from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

export const createProject = async (formData: ProjectFormData) => {
    try {
        const { data } = await api.post('/projects', formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        console.log(error);
    }
}
export const getProjects = async () => {
    const token = localStorage.getItem('auth_token');
    console.log(token);
    try {
        const { data } = await api('/projects')
        const response = dashboardProjectSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        console.log(error);
    }
}

export const getProjectById = async (id: Project['_id']) => {
    try {
        const { data } = await api(`/projects/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        console.log(error);
    }
}

type ProjectAPIType = {
    formData: ProjectFormData,
    projectId: Project['_id']
}

export const updateProject = async ({ projectId, formData }: ProjectAPIType) => {
    try {
        const { data } = await api.put<string>(`/projects/${projectId}`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        console.log(error);
    }
}

export const deleteProject = async (id: Project['_id']) => {
    try {
        const { data } = await api.delete<string>(`/projects/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        console.log(error);
    }
}