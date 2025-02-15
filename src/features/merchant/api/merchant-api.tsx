import api from "@/lib/axios/instance";

export const merchantAPI = {
    getAllMerchants: async (filter: any) => {
        return api.get("/merchant", {
            params: filter
        });
    },
    createMerchant : async (data: any) => {
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