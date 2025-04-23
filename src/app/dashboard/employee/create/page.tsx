"use client";

import { Separator } from "@/components/ui/separator";
import { useCreateEmployee } from "@/features/employee/api/employee-query";
import EmployeeForm, { EmployeeFormValues } from "@/features/employee/components/employee-form";
import { useRouter } from "next/navigation";

const defaultValues: EmployeeFormValues = {
    name: "",
    email: "",
    password: "",
};

const CreateEmployeePage = () => {
    const router = useRouter();
    const { mutate, isPending } = useCreateEmployee();

    const onSubmit = (data: EmployeeFormValues) => {
        mutate(data, {
            onSuccess: () => {
                router.push("/dashboard/employee");
            },
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium text-primary">Create Employee</h3>
                <p className="text-sm text-muted-foreground">
                    Add a new employee to the system
                </p>
            </div>
            <Separator />
            <div className="max-w-2xl">
                <EmployeeForm
                    onSubmit={onSubmit}
                    isLoading={isPending}
                    defaultValues={defaultValues}
                />
            </div>
        </div>
    );
};

export default CreateEmployeePage;