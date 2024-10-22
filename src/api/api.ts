import { ProjectFormData } from "@/types/index";
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