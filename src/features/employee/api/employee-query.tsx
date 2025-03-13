import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import employeeAPI from "./employee-api";

export const useGetAllEmployees = (filter: any) => {
    return useQuery({
        queryKey: ["employees", filter],
        queryFn: () => employeeAPI.getAllEmployees(filter),
    });
};

export const useCreateEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: employeeAPI.createEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === "employees";
                },
            });
            toast.success("Employee created successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error creating employee");
        },
    });
}

export const useGetEmployeeById = (employeeId: string) => {
    return useQuery({
        queryKey: ["employees", employeeId],
        queryFn: () => employeeAPI.getEmployeeById(employeeId),
    });
};

export const useDeleteEmployeeById = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: employeeAPI.deleteEmployeeById,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === "employees";
                },
            });
            toast.success("Employee deleted successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message ?? "Error deleting employee");
        },
    });
};

export const usePasswordChange = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: employeeAPI.changePassword,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === "employees";
                },
            });
            toast.success("Password changed successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error changing password");
        },
    });
};

export const useUploadImage = () => {
    return useMutation({
        mutationFn: employeeAPI.uploadImage,
        onSuccess: () => {
            toast.success("Image uploaded successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error uploading image");
        },
    });
};

export const useUpdateEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: employeeAPI.updateEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === "employees";
                },
            });
            toast.success("Employee updated successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error updating employee");
        },
    });
}