import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { ConfirmToken, UserRegisterForm } from "../types";

export const createAccount = async (formData: UserRegisterForm) => {
    try {
        const url = '/auth/register';
        const { data } = await api.post<string>(url, formData);
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const confirmAccount = async (formData: ConfirmToken) => {
    try {
        const url = '/auth/confirm-account';
        const { data } = await api.post<string>(url, formData);
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}