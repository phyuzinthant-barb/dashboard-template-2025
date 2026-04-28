import { toast } from "sonner";
import {
  useGetMeQuery,
  usePutMeMutation,
  useUpdatePasswordMutation,
} from "../services/userServices";
import { getErrorMessage } from "@/utils/errorHandler";

export const useProfile = () => {
  const { data, isLoading, error } = useGetMeQuery();

  const [
    updatePassword,
    {
      isLoading: updatingPassword,
      isSuccess: updatedPassword,
      error: updatePasswordError,
    },
  ] = useUpdatePasswordMutation();

  const [
    update,
    { isLoading: updating, isSuccess: updated, error: updateError },
  ] = usePutMeMutation();

  const isAuthorized = (module: string, action: string) => {
    if (isLoading) {
      return true;
    } else {
      return data?.role?.permissions?.some(
        (el: any) =>
          el.module === module && el.permission === action.toUpperCase()
      );
    }
  };

  const updateUserPassword = async (data: any) => {
    try {
      await updatePassword(data).unwrap();

      toast.success("Profile updated successfully!", {
        position: "top-center",
        className: "!bg-blue-400 !text-white",
      });
    } catch (error) {
      console.error("Update Policy failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  const updateMe = async (data: any) => {
    try {
      await update(data).unwrap();

      toast.success("Profile updated successfully!", {
        position: "top-center",
        className: "!bg-blue-400 !text-white",
      });
    } catch (error) {
      console.error("Update Policy failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  return {
    data,
    isLoading,
    error,
    isAuthorized,
    updateMe,
    updating,
    updated,
    updateError,
    updateUserPassword,
    updatingPassword,
    updatedPassword,
    updatePasswordError,
  };
};
