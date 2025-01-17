import api from "@/lib/axios/instance";

export type CreateTransactionPayload = {
    // Add your transaction creation fields here
    amount: number;
    type: string;
    description?: string;
    // Add other relevant fields
};

export type UpdateTransactionPayload = {
    // Add your transaction update fields here
    status?: string;
    notes?: string;
    id: string;
    // Add other updatable fields
};

export const transactionAPI = {
    createTransaction: async (data: CreateTransactionPayload) => {
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
    }
};