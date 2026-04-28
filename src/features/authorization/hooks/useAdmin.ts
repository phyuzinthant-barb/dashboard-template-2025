import { toast } from "sonner";
import { getErrorMessage } from "@/utils/errorHandler";
import {
  useAdminQuery,
  useDeleteAdminMutation,
  usePostAdminMutation,
  usePutAdminMutation,
} from "../services/adminService";
import { useSearchParams } from "react-router-dom";

const useAdmin = () => {
  const [searchParams] = useSearchParams();
  // get
  const {
    data,
    isLoading: gettingAdmins,
    error: getError,
  } = useAdminQuery({
    param: new URLSearchParams(
      Object.fromEntries(
        Array.from(searchParams.entries()).filter(([key]) => key !== "skip")
      )
    ).toString(),
  });

  // create
  const [add, { isLoading: adding, isSuccess: added, error: addError }] =
    usePostAdminMutation();

  const [
    update,
    { isLoading: updating, isSuccess: updated, error: updateError },
  ] = usePutAdminMutation();

  const [remove, { isLoading: removing, isSuccess: removed }] =
    useDeleteAdminMutation();

  // add
  const addAdmin = async (data: any) => {
    try {
      await add(data).unwrap();
      toast.success("Admin added successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Add Admin failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // update
  const updateAdmin = async (id: string, data: any) => {
    try {
      await update({ id, ...data }).unwrap();
      toast.success("Admin updated successfully!", {
        position: "top-center",
        className: "!bg-blue-400 !text-white",
      });
    } catch (error) {
      console.error("Update Admin failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // delete
  const deleteAdmin = async (id: string) => {
    try {
      await remove({ id }).unwrap();
      toast.success("Admin deleted successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Delete Admin failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  return {
    data,
    gettingAdmins,
    getError,
    addAdmin,
    added,
    adding,
    updating,
    updated,
    deleteAdmin,
    updateAdmin,
    updateError,
    removing,
    removed,
    addError,
  };
};

export default useAdmin;
