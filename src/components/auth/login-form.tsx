"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/context/auth-context";
import Admin, { AdminRole } from "@/models/admin";
import FormProvider from "../form/form-provider";
import FormInput from "../form/form-input";
import FormPassword from "../form/form-password";
import { useAdminLogin } from "@/features/authentication/query/user";
import FormGroupSelect from "../form/form-select";

const loginFormSchema = z.object({
    email: z
        .string()
        .email({ message: "Invalid email format" })
        .max(255, { message: "Email must be less than 255 characters" }),
    loginAs: z.nativeEnum(AdminRole),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

const defaultValues: LoginFormValues = {
    email: "",
    password: "",
    loginAs: AdminRole.SUPER_ADMIN,
};

const LoginForm = () => {
    const { setUser } = useAuthStore();
    const router = useRouter();
    const { mutate, isPending } = useAdminLogin();
    const form = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues,
    });


    const onSubmit = (formValue: LoginFormValues) => {
        mutate(formValue, {
            onSuccess: (data:any) => {
                const admin = new Admin(data?.data?.admin);
                setUser(admin);
                const role = formValue.loginAs;
                if (role === AdminRole.Merchant) {
                    router.push("/dashboard/merchant-stats");
                } else {
                     router.push("/dashboard");
                }
            }
        });
    };

    return (
        <FormProvider className="w-full space-y-3" methods={form} onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput
                control={form.control}
                label="Email"
                name="email"
                type="email"
            />
            <FormPassword
                control={form.control}
                label="Password"
                name="password"
            />
            <FormGroupSelect
                control={form.control}
                label="Login As"
                name="loginAs"
                options={[
                    { label: "Admin", value: AdminRole.SUPER_ADMIN },
                    { label: "Merchant", value: AdminRole.Merchant },
                ]}
            />
            <div className="space-y-2 pt-2">
                <Button disabled={isPending} className="block w-full"  >
                    Login
                </Button>
            </div>
        </FormProvider>
    );
};

export default LoginForm;