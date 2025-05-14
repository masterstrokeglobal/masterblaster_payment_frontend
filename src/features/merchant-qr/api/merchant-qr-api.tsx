import api from "@/lib/axios/instance";

export const merchantQrAPI = {
    getAllMerchantQrs: async (filter: any) => {
        return api.get("/merchant-qr", {
            params: filter
        });
    },

    createMerchantQr: async (data: any) => {
        return api.post("/merchant-qr", data);
    },

    startAutomation: async (data: any) => {
        return api.post("/merchant-qr/start-automation", data);
    },

    stopAutomation: async (data: any) => {
        return api.post("/merchant-qr/stop-automation", data);
    },

    getMerchantQrById: async (qrId: string) => {
        return api.get(`/merchant-qr/${qrId}`);
    },

    updateMerchantQr: async (qrId: string, data: any) => {
        return api.patch(`/merchant-qr/${qrId}`, data);
    },

    deleteMerchantQr: async (qrId: string) => {
        return api.delete(`/merchant-qr/${qrId}`);
    },

    uploadQrImage: async (data: FormData) => {
        return api.post("/merchant-qr/upload-qr", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
};

export default merchantQrAPI;