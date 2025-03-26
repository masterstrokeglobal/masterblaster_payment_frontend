import api from "@/lib/axios/instance";

export const permissionAPI = {
    getAllPermissions: async (filter: any) => {
        return api.get("/permission/all", {
            params: filter
        });
    },

    getPermissionById: async (permissionId: string) => {
        return api.get(`/permission/${permissionId}`);
    },

    createPermission: async (data: any) => {
        return api.post("/permission", data);
    },

    updatePermission: async (data: any) => {
        return api.put(`/permission/${data.id}`, data);
    },

    deletePermissionById: async (permissionId: string) => {
        return api.delete(`/permission/${permissionId}`);
    },
};

export default permissionAPI;