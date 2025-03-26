"use client";
import { useParams } from "next/navigation";
import { useGetPermissionById, useUpdatePermission } from "../api/permission-query";
import { useMemo } from "react";
import { PermissionFormValues } from "./permission-form";
import PermissionsForm from "./permission-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/common/loading-screen";
const EditPermission = () => {
    const router = useRouter();
    const { id } = useParams();
    const { data, isLoading } = useGetPermissionById(id?.toString() || "");
    const permission = useMemo(() => {
        return data?.data;
    }, [data]);

    const { mutate: updatePermission, isPending } = useUpdatePermission();

    const defaultValues: PermissionFormValues = useMemo(() => {
        return {
            name: permission?.name,
            permissions: permission?.permissions,
        };
    }, [permission]);


    const onSubmit = (data: PermissionFormValues) => {
        updatePermission({
            id: permission?.id,
            name: data.name,
            permissions: data.permissions,
        }, {
            onSuccess: () => {
                router.push("/dashboard/permissions");
                toast.success("Permission updated successfully");
            },
            onError: () => {
                toast.error("Failed to update permission");
            }
        });
    }


    if (isLoading) return <LoadingScreen />
    console.log(defaultValues);
    return <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Edit Permission</h1>
        <PermissionsForm defaultValues={defaultValues} onSubmit={onSubmit} isLoading={isPending} />
    </section>
};

export default EditPermission;


