import { toast } from "sonner";
import {
  useRoleQuery,
  useDeleteRoleMutation,
  usePostRoleMutation,
  usePutRoleMutation,
} from "../services/roleService";
import { getErrorMessage } from "@/utils/errorHandler";
import { RoleFormValues } from "../types";

const useRole = () => {
  // get
  const { data, isLoading: gettingRoles, error: getError } = useRoleQuery();

  // create
  const [add, { isLoading: adding, isSuccess: added }] = usePostRoleMutation();

  const [update, { isLoading: updating, isSuccess: updated }] =
    usePutRoleMutation();

  const [remove, { isLoading: removing, isSuccess: removed }] =
    useDeleteRoleMutation();

  // add
  const addRole = async (data: RoleFormValues) => {
    try {
      await add(data).unwrap();
      toast.success("Role added successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Add Role failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // update
  const updateRole = async (id: string, data: RoleFormValues) => {
    try {
      await update({ id, ...data }).unwrap();
      toast.success("Role updated successfully!", {
        position: "top-center",
        className: "!bg-blue-400 !text-white",
      });
    } catch (error) {
      console.error("Update Role failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // delete
  const deleteRole = async (id: string) => {
    try {
      await remove({ id }).unwrap();
      toast.success("Role deleted successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Delete Role failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  return {
    data,
    gettingRoles,
    getError,
    addRole,
    added,
    adding,
    updating,
    updated,
    deleteRole,
    updateRole,
    removing,
    removed,
  };
};

export default useRole;
