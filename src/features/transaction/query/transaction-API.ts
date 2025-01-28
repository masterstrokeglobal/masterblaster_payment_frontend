import api from "@/lib/axios/instance";


export type UpdateTransactionPayload = {
    // Add your transaction update fields here
    status?: string;
    notes?: string;
    id: string;
    // Add other updatable fields
};

export const transactionAPI = {
    createTransaction: async (data: any) => {
        return api.post("/transaction", data);
    },

    getAlltransaction: async (filter?: Record<string, any>) => {
        return api.get("/transaction", { params: filter });
    },

    getTransactionById: async (id: string) => {
        return api.get(`/transaction/${id}`);
    },

    updateTransactionById: async (data: UpdateTransactionPayload) => {
        return api.patch(`/transaction/${data.id}`, data);
    },

    deleteTransactionById: async (id: string) => {
        return api.delete(`/transaction/${id}`);
    },
    confirmWithdrawal: async (id: string) => {
        return api.post(`/transaction/${id}/confirm-withdrawal`);
    },

    // Add other transaction API methods
    approveTransaction: async (id: string) => {
        return api.patch(`/transaction/approve/${id}`);
    },

    rejectTransaction: async (id: string) => {
        return api.patch(`/transaction/reject/${id}`);
    },
};