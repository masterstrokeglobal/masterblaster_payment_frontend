import { useAuthStore } from "@/context/auth-context";
import { useGetCurrentUser } from "@/features/authentication/query/user";
import Admin from "@/models/admin";
import { useEffect } from "react";

const useLogin = () => {
    const { setUser, setLoadig } = useAuthStore();
    const { data, isSuccess, isError, error } = useGetCurrentUser();

    useEffect(() => {

        if (isSuccess) {
            const user = new Admin(data);
            setUser(user);
        }
        if (isError) {
            console.log("error", error);
            setUser(null);
            setLoadig(false);
        }


    }, [data, isSuccess, isError]);

}

export default useLogin;