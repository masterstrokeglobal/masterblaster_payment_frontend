import { useAuthStore } from "@/context/auth-context";
import { useGetCurrentUser } from "@/features/authentication/query/user";
import { useEffect } from "react";

const useLogin = () => {
    const { setUser, setLoadig } = useAuthStore();
    const { data, isSuccess, isError } = useGetCurrentUser();

    useEffect(() => {
        console.log(data);
        if (isSuccess) {
            setUser(data);
        }
        if (isError) {
            setUser(null);
            setLoadig(false);
        }


    }, [data, isSuccess, isError]);

}

export default useLogin;