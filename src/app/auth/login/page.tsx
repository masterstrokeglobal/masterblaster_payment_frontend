import LoginForm from "@/components/auth/login-form";

const LoginPage = () => {
    return (
        <div className="w-full min-h-screen  flex items-center ">
            <div className="flex w-full items-center my-auto h-full justify-center py-12">
                <div className="mx-auto grid max-w-md gap-6">
                    <div className="grid gap-2 ">
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;