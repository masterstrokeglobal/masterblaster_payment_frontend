import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import FormProvider from "@/components/form/form-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormCheckbox from "@/components/form/form-checkbox";
import FormInput from "@/components/form/form-input";

// Define Zod schema for permission actions
const permissionActionSchema = z.object({
  view: z.boolean().optional().default(false),
  edit: z.boolean().optional().default(false),
  add: z.boolean().optional().default(false),
  delete: z.boolean().optional().default(false),
  active: z.boolean().optional().default(false)
});

// Define Zod schema for entire permissions object
export const permissionsSchema = z.object({
  dashboard: permissionActionSchema.optional(),
  settings: permissionActionSchema.optional(),
  qr: permissionActionSchema.optional(),
  payout: permissionActionSchema.optional(),
});

const formSchema = z.object({
  name: z.string().min(1),
  permissions: permissionsSchema
})
// Infer TypeScript types
export type PermissionActions = z.infer<typeof permissionActionSchema>;
export type Permissions = z.infer<typeof permissionsSchema>;

export type PermissionFormValues = z.infer<typeof formSchema>;
type Props = {
  defaultValues?: PermissionFormValues;
  onSubmit: (data: PermissionFormValues) => void;
  isLoading?: boolean;
};

const PermissionsForm = ({ defaultValues, onSubmit, isLoading }: Props) => {
  const form = useForm<PermissionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      permissions: {
        dashboard: {},
        settings: {},
        qr: {},
        payout: {},
      }
    }
  });

  const handleSubmit = (data: PermissionFormValues) => {
    onSubmit(data);
  };

  return (
    <FormProvider onSubmit={form.handleSubmit(handleSubmit)} methods={form}>
      <div className="space-y-8">
        {/* Dashboard Permissions */}

        <FormInput
          control={form.control}
          name="name"
          label="Name"
        />
        <Card>
          <CardHeader>
            <CardTitle>Dashboard Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4">
              <FormCheckbox
                control={form.control}
                name="permissions.dashboard.view"
                label="View"
              />
              <FormCheckbox
                control={form.control}
                name="permissions.dashboard.edit"
                label="Edit"
              />
              <FormCheckbox
                control={form.control}
                name="permissions.dashboard.add"
                label="Add"
              />
              <FormCheckbox
                control={form.control}
                name="permissions.dashboard.delete"
                label="Delete"
              />
              <FormCheckbox
                control={form.control}
                name="permissions.dashboard.active"
                label="Active"
              />
            </div>
          </CardContent>
        </Card>

        {/* Settings Permissions */}
        <Card>
          <CardHeader>
            <CardTitle>Settings Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4">
              <FormCheckbox
                control={form.control}
                name="permissions.settings.view"
                label="View"
              />
              <FormCheckbox
                control={form.control}
                name="permissions.settings.edit"
                label="Edit"
              />
              <FormCheckbox
                control={form.control}
                name="permissions.settings.add"
                label="Add"
              />
              <FormCheckbox
                control={form.control}
                name="permissions.settings.delete"
                label="Delete"
              />
              <FormCheckbox
                control={form.control}
                name="permissions.settings.active"
                label="Active"
              />
            </div>
          </CardContent>
        </Card>

        {/* QR Permissions */}
        <Card>
          <CardHeader>
            <CardTitle>QR Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4">
              <FormCheckbox
                control={form.control}
                name="permissions.qr.view"
                label="View"
              />
              <FormCheckbox
                control={form.control}
                name="permissions.qr.edit"
                label="Edit"
              />
              <FormCheckbox
                control={form.control}
                name="permissions.qr.add"
                label="Add"
              />
              <FormCheckbox
                control={form.control}
                name="permissions.qr.delete"
                label="Delete"
              />
              <FormCheckbox
                control={form.control}
                name="permissions.qr.active"
                label="Active"
              />
            </div>
          </CardContent>
        </Card>

        {/* Payout Permissions */}
        <Card>
          <CardHeader>
            <CardTitle>Payout Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4">
              <FormCheckbox
                control={form.control}
                name="permissions.payout.view"
                label="View"
              />
              <FormCheckbox
                control={form.control}
                name="permissions.payout.edit"
                label="Edit"
              />
              <FormCheckbox
                control={form.control}
                name="permissions.payout.add"
                label="Add"
              />
              <FormCheckbox
                control={form.control}
                name="permissions.payout.delete"
                label="Delete"
              />
              <FormCheckbox
                control={form.control}
                name="permissions.payout.active"
                label="Active"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <footer className="flex justify-end gap-4 mt-8">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving Permissions..." : "Save Permissions"}
        </Button>
      </footer>
    </FormProvider>
  );
};

export default PermissionsForm;