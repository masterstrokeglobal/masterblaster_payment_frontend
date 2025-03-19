import api from "@/lib/axios/instance";

export const apiServiceAPI = {
    // API list functions
    getAllAPIServices: async (filter: any) => {
        return api.get("/api-list/all", { params: filter });
    },
    createAPIService: async (data: any) => {
        return api.post("/api-list/create", data);
    },
    updateAPIService: async (data: any) => {
        return api.patch(`/api-list/${data.id}`, data);
    },
    deleteAPIService: async (data: any) => {
        return api.delete(`/api-list/${data.id}`, data);
    },
    getAPIServiceById: async (id: number) => {
        return api.get(`/api-list/${id}`);
    },
    
    // API request functions
    getAllAPIRequests: async (filter: any) => {
        return api.get("/api-request/all", { params: filter });
    },
    createAPIServiceRequest: async (data: any) => {
        return api.post("/api-request/create", data);
    },
    updateAPIServiceRequest: async (data: any) => {
        return api.patch(`/api-request/${data.id}`, data);
    },
    deleteAPIServiceRequest: async (data: any) => {
        return api.delete(`/api-request/${data.id}`, data);
    },
    getAPIServiceRequestById: async (id: number) => {
        return api.get(`/api-request/${id}`);
    }
};