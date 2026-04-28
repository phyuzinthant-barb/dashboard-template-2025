import { toast } from "sonner";
import { getErrorMessage } from "@/utils/errorHandler";
import {
  useAdminRoleQuery,
  useDeleteAdminRoleMutation,
  usePostAdminRoleMutation,
  usePutAdminRoleMutation,
} from "../services/adminRoleService";

const useAdminRoles = () => {
  // get
  const {
    data,
    isLoading: gettingRoles,
    error: getError,
  } = useAdminRoleQuery();

  // create
  const [add, { isLoading: adding, isSuccess: added, error: addError }] =
    usePostAdminRoleMutation();

  const [
    update,
    { isLoading: updating, isSuccess: updated, error: updateError },
  ] = usePutAdminRoleMutation();

  const [remove, { isLoading: removing, isSuccess: removed }] =
    useDeleteAdminRoleMutation();

  // add
  const addRoles = async (data: any) => {
    try {
      await add(data).unwrap();
      toast.success("Roles added successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Add Roles failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // update
  const updateRoles = async (id: string, data: any) => {
    try {
      await update({ id, data: data }).unwrap();
      toast.success("Roles updated successfully!", {
        position: "top-center",
        className: "!bg-blue-400 !text-white",
      });
    } catch (error) {
      console.error("Update Roles failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // delete
  const deleteRoles = async (id: string) => {
    try {
      await remove({ id }).unwrap();
      toast.success("Roles deleted successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Delete Roles failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  return {
    data,
    gettingRoles,
    getError,
    addRoles,
    added,
    adding,
    updating,
    updated,
    updateError,
    deleteRoles,
    updateRoles,
    removing,
    removed,
    addError,
  };
};

export default useAdminRoles;
