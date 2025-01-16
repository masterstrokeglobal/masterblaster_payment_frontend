import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RegisterPayload, userAPI } from '../api/user';
import User from '@/models/user';
import { AxiosError } from 'axios';



// Registration hook
export const useRegisterUser = () => {
    return useMutation<RegisterPayload, AxiosError<any, any>, RegisterPayload>({
        mutationFn: async (data: RegisterPayload) => {
            const response = await userAPI.register(data);
            return response.data;
        },
    });
};

// Current user fetch hook
export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: ['user'],
        retry: (failureCount) => {
            return failureCount < 3;
        },
        queryFn: async () => {
            const response = await userAPI.getCurrentUser();
            const user = new User(response.data);
            return user;
        },
    });
};

// User update hook
export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation(
        {
            mutationFn: userAPI.updateUser,
            onSuccess: () => {
                queryClient.invalidateQueries({
                    predicate: query => query.queryKey[0] === 'user',
                });
            },
        }
    );
};

export const useAdminLogin = () => {
    return useMutation({
        mutationFn: userAPI.login,
    });
}