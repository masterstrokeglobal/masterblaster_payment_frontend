

// Payout API
import api from "@/lib/axios/instance";

export const payoutAPI = {
    getAllPayouts: async (filter: any) => {
        return api.get("/payout", {
            params: filter,
        });
    },
    getPayoutById: async (payoutId: string) => {
        return api.get(`/payout/${payoutId}`);
    },

    createPayout: async (data: any) => {
        return api.post("/payout", data);
    },

    updatePayout: async (payoutId: string, data: any) => {
        return api.put(`/payout/${payoutId}`, data);
    },

    deletePayout: async (payoutId: string) => {
        return api.delete(`/payout/${payoutId}`);
    },
    getAllPayoutOptions: async () => {
        return api.get("/withdraw-detail");
    },
    createPayoutOption: async (data: any) => {
        return api.post("/withdraw-detail", data);
    },
    updatePayoutOption: async (optionId: string, data: any) => {
        return api.put(`/withdraw-detail/${optionId}`, data);
    },
    deletePayoutOption: async (optionId: string) => {
        return api.delete(`/withdraw-detail/${optionId}`);
    },
};

export default payoutAPI;