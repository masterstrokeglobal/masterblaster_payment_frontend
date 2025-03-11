import api from "@/lib/axios/instance";

export const merchantApiKeyAPI = {
    createApiKey: async (data: any) => {
        return api.post("/merchant-api-key", data);
    },

    getAllApiKeys: async (filters: any) => {
        return api.get("/merchant-api-key", {
            params: filters
        });
    },

    getApiKeyById: async (apiKeyId: string) => {
        return api.get(`/merchant-api-key/${apiKeyId}`);
    },

    updateIpAddress: async (apiKeyId: string, data: any) => {
        return api.patch(`/merchant-api-key/${apiKeyId}/ip`, data);
    },

    regenerateApiKey: async (apiKeyId: string) => {
        return api.post(`/merchant-api-key/${apiKeyId}/regenerate`);
    },

    deactivateApiKey: async (apiKeyId: string) => {
        return api.post(`/merchant-api-key/${apiKeyId}/deactivate`);
    },

    activateApiKey: async (apiKeyId: string) => {
        return api.post(`/merchant-api-key/${apiKeyId}/activate`);
    }
};

export default merchantApiKeyAPI;