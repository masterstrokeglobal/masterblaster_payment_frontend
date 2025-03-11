import api from "@/lib/axios/instance";

export const merchantAPI = {
    getAllMerchants: async (filter: any) => {
        return api.get("/merchant", {
            params: filter
        });
    },

    getDashboardData: async (filter: any) => {
        return api.get("/merchant/dashboard", {
            params: filter
        });
    },

    getBarChartData: async (filter: any) => {
        return api.get("/merchant/dashboard/bar-chart", {
            params: filter
        });
    },
    updateMerchant: async (data: any) => {
        return api.patch(`/merchant/${data.id}`, data);
    },
    updateRestrictionsMerchant: async (data: any) => {
        return api.patch(`/merchant/restricted-api/${data.id}`, data);
    },
    createMerchant: async (data: any) => {
        return api.post("/merchant", data);
    },

    getMerchantById: async (merchantId: string) => {
        return api.get(`/merchant/${merchantId}`);
    },

    changePassword: async (data: any) => {
        return api.put("/merchant/change-password", data);
    },

    deleteMerchantById: async (merchantId: string) => {
        return api.delete(`/merchant/${merchantId}`);
    },

    uploadImage: async (data: FormData) => {
        return api.post("/merchant/upload-image", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
};

export default merchantAPI;