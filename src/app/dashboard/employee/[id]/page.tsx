"use client";

import LoadingScreen from '@/components/common/loading-screen';
import { useGetEmployeeById, useUpdateEmployee } from '@/features/employee/api/employee-query';
import Employee from '@/models/employee';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { Separator } from '@/components/ui/separator';
import EmployeeForm, { EmployeeFormValues } from '@/features/employee/components/employee-form';

const UpdateEmployeePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { isLoading, data, isSuccess } = useGetEmployeeById(id!.toString());
  const { mutate, isPending: isUpdating } = useUpdateEmployee();

  const employee = useMemo(() => {
    if (isSuccess) {
      const employee = new Employee(data?.data);
      return employee;
    }
    return null;
  }, [data, isSuccess]);

  const handleSubmit = (formData: EmployeeFormValues) => {
    mutate(
      { id: id!.toString(),...formData },
      {
        onSuccess: () => {
          router.push("/dashboard/employees");
        },
      }
    );
  };

  if (isLoading || employee == null) {
    return <LoadingScreen className='min-h-screen' />;
  }

  const defaultValues: EmployeeFormValues = {
    email: employee.email!,
    name: employee.name!,
    password: employee.password!,
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Update Employee</h3>
        <p className="text-sm text-muted-foreground">
          Update employee information
        </p>
      </div>
      <Separator />
      <div className="max-w-2xl">
        <EmployeeForm
          isUpdate
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          isLoading={isUpdating}
        />
      </div>
    </div>
  );
};

export default UpdateEmployeePage;