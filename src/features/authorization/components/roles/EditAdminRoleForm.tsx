import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import useAdminRoles from "../../hooks/useAdminRoles";
import {
  usePermissionsQuery,
  useSingleAdminRoleQuery,
} from "../../services/adminRoleService";
import { getErrorMessage } from "@/utils/errorHandler";

type PermissionItem = {
  _id: string;
  permission: string;
};

type GroupedPermission = {
  module: string;
  permissions: PermissionItem[];
};

type PermissionArray = GroupedPermission[];

const EditAdminRoleForm = () => {
  const { id } = useParams();

  const nav = useNavigate();

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [groupedPermissions, setGroupedPermissions] = useState<PermissionArray>(
    []
  );

  const { updateRoles, updated, updating, updateError } = useAdminRoles();

  const { data } = usePermissionsQuery();
  const { data: roleData } = useSingleAdminRoleQuery({
    id: id as string,
  });

  const roleSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Role description is required"),
    permissions: z
      .array(z.string())
      .min(1, "At least one permission is required"),
  });

  type RoleFormValues = z.infer<typeof roleSchema>;

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (data && roleData) {
      const groupedWithPermission: any = Object.entries(
        data?.data?.reduce(
          (acc: Record<string, PermissionItem[]>, curr: any) => {
            if (!acc[curr.module]) acc[curr.module] = [];
            acc[curr.module].push({
              _id: curr._id,
              permission: curr.permission,
            });
            return acc;
          },
          {}
        )
      ).map(([module, permissions]) => ({
        module,
        permissions,
      }));

      setGroupedPermissions(groupedWithPermission);
      setSelectedPermissions(roleData?.permissions?.map((el: any) => el?._id));
      form.setValue("title", roleData?.title);
      form.setValue("description", roleData?.description);
      form.setValue(
        "permissions",
        roleData?.permissions?.map((el: any) => el?._id)
      );
      console.log(roleData);
    }
  }, [data, roleData]);

  const handleCheckboxChange = (id: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(id)
        ? prev.filter((permissionId) => permissionId !== id)
        : [...prev, id]
    );
    form.setValue("permissions", selectedPermissions);
  };

  const onSubmit = async (data: RoleFormValues) => {
    const payload = {
      ...data,
      permissions: selectedPermissions,
    };
    await updateRoles(id as string, payload);
  };

  useEffect(() => {
    if (updated) nav(-1);
  }, [updated]);

  return (
    <Form {...form}>
      {updateError && <ErrorMessage message={getErrorMessage(updateError)} />}

      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 pb-3 gap-x-5 bg-white dark:bg-gray-800 rounded-lg">
          <div className="border-b-2 px-5 py-3 border-blue-500 col-span-full">
            <p className="font-semibold text-lg">Edit Role</p>
          </div>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="px-5 col-span-full w-1/2 py-3">
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="px-5 col-span-full w-1/2 py-3">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg">
          <div className="grid grid-cols-2 pb-3 gap-x-5">
            <div className="border-b-2 px-5 py-3 col-span-full">
              <p className="font-semibold text-lg">Group of Permissions</p>
            </div>

            <div className="col-span-full last:p-0 overflow-hidden w-full">
              <div className="bg-blue-600 p-4 flex justify-between mb-3">
                <div className=" w-1/2">
                  <p className="text-white">MODULE</p>
                </div>
                <div className="flex w-1/2 justify-between ">
                  <p className="text-white">Create</p>
                  <p className="text-white">Update</p>
                  <p className="text-white">Delete</p>
                  <p className="text-white">Read</p>
                </div>
              </div>

              {groupedPermissions?.map(({ module, permissions }) => (
                <div key={module} className=" p-4 flex justify-between gap-12">
                  <div className=" w-1/2">
                    <p className="text-black capitalize">{module}</p>
                  </div>
                  <div className="flex w-1/2 justify-between">
                    {permissions.map((permission) => (
                      <input
                        type="checkbox"
                        key={permission._id}
                        className=" w-4 h-4 shadow-sm"
                        checked={selectedPermissions.includes(permission._id)}
                        onChange={() => handleCheckboxChange(permission._id)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {form.formState.errors.permissions && (
              <p className="text-red-500 text-sm px-5">
                {form.formState.errors.permissions.message}
              </p>
            )}
          </div>

          <div className="flex justify-end mt-5 p-3 items-center gap-3">
            <Button
              type="button"
              className=" h-12 px-10"
              onClick={() => nav(-1)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button className=" h-12 px-10" type="submit" disabled={updating}>
              {updating && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              Edit Role
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EditAdminRoleForm;
