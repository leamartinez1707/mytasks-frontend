import { isAxiosError } from "axios";
import { UserFormData } from "../types";
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