import api from "@/lib/axios/instance";

export const loginLogAPI = {
    createLoginLog: async (data: any) => {
        return api.post("/login-log/create", data);
    },
    
    getAllLoginLogs: async (filter: any) => {
        return api.get("/login-log/all", {
            params: filter
        });
    },
    
    getLoginLogById: async (loginLogId: string) => {
        return api.get(`/login-log/${loginLogId}`);
    }
};

export default loginLogAPI;