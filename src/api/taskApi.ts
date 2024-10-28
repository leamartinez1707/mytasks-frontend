import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Project, Task, TaskFormData } from "../types";

type TaskApi = {
    formData: TaskFormData,
    projectId: Project['_id'],
    taskId: Task['_id']
}

export const createTask = async ({ formData, projectId }: Pick<TaskApi, 'formData' | 'projectId'>) => {
    try {
        const url = `/projects/${projectId}/tasks`;
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        console.log(error);

    }
}

export const getTaskById = async ({ projectId, taskId }: Pick<TaskApi, 'projectId' | 'taskId'>) => {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const { data } = await api(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        console.log(error);

    }
}
export const updateTask = async ({ projectId, taskId, formData }: Pick<TaskApi, 'projectId' | 'taskId' | 'formData'>) => {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const { data } = await api.put<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        console.log(error);

    }
}