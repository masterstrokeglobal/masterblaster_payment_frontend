import { LoginFormValues } from "@/components/auth/login-form";
import api from "@/lib/axios/instance";


export type RegisterPayload = {
    title: string;
    first_name: string;
    last_name: string;
    profession: string;
    pronouns: string;
    country: string;
};


export const userAPI = {
    register: async (data: RegisterPayload) => {
        return api.post("/dashboard", data);
    },
    login: async (data: LoginFormValues) => {
        return api.post("/auth/login", data);
    },
    logout: async () => {
        return api.post("/auth/logout");
    },
    getCurrentUser: async () => {
        return await api.get("/auth/my-details");
    },
    updateUser: async (data: RegisterPayload) => {
        return await api.patch("/user", data);
    }
};
