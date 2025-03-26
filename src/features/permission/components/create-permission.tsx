"use client";
import { useCreatePermission } from "../api/permission-query";
import PermissionsForm, { PermissionFormValues } from "./permission-form";

const defaultValues: PermissionFormValues = {
    name: "",
    permissions: {
        dashboard: {
            view: false,
            edit: false,
            add: false,
            delete: false,
            active: false,
        },
        settings: {
            view: false,
            edit: false,
            add: false,
            delete: false,
            active: false,
        },
        qr: {
            view: false,
            edit: false,
            add: false,
            delete: false,
            active: false,
        },
        payout: {
            view: false,
            edit: false,
            add: false,
            delete: false,
            active: false,
        }
    }
}
const CreatePermission = () => {

    const { mutate: createPermission, isPending } = useCreatePermission();

    const onSubmit = (data: PermissionFormValues) => {
        createPermission(data);
    }
    return (
       <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Create Permission</h1>
        <PermissionsForm defaultValues={defaultValues} onSubmit={onSubmit} isLoading={isPending} />
       </section>
    )
}

export default CreatePermission;
