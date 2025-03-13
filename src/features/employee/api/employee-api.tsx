import api from "@/lib/axios/instance";

export const employeeAPI = {
    getAllEmployees: async (filter: any) => {
        return api.get("/employee", {
            params: filter
        });
    },
    
    getEmployeeById: async (employeeId: string) => {
        return api.get(`/employee/${employeeId}`);
    },
    
    createEmployee: async (data: any) => {
        return api.post("/employee", data);
    },
    
    updateEmployee: async (data: any) => {
        return api.patch(`/employee/${data.id}`, data);
    },
    
    deleteEmployeeById: async (employeeId: string) => {
        return api.delete(`/employee/${employeeId}`);
    },
    
    changePassword: async (data: any) => {
        return api.put("/employee/change-password", data);
    },
    
    uploadImage: async (data: FormData) => {
        return api.post("/employee/upload-image", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
};

export default employeeAPI;