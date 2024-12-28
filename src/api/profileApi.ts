import { isAxiosError } from "axios";
import { UpdateCurrentPasswordForm, UserFormData } from "../types";
import api from "@/lib/axios";

export const updateProfile = async (formData: UserFormData) => {
    try {
        const { data } = await api.put<string>('/profile/update', formData);
        return data
    }
    catch (error) {
        console.log(error)
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const updatePassword = async (formData: UpdateCurrentPasswordForm) => {
    try {
        const { data } = await api.post<string>('/profile/update-password', formData);
        return data
    }
    catch (error) {
        console.log(error)
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}