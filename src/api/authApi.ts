import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { ConfirmToken, RequestConfirmationCodeForm, UserLoginForm, UserRegisterForm } from "../types";

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

export const requestConfirmationCode = async (formData: RequestConfirmationCodeForm) => {
    try {
        const url = '/auth/request-code';
        const { data } = await api.post<string>(url, formData);
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
export const login = async (formData: UserLoginForm) => {
    try {
        const url = '/auth/login';
        const { data } = await api.post<string>(url, formData);
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}