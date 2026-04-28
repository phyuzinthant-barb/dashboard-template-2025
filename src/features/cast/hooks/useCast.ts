import { toast } from "sonner";
import {
  useCastQuery,
  useDeleteCastMutation,
  usePostCastMutation,
  usePutCastMutation,
} from "../services/castService";
import { CastFormValues } from "../types";
import { getErrorMessage } from "@/utils/errorHandler";

const useCast = () => {
  // get
  const { data, isLoading: gettingCasts, error: getError } = useCastQuery();

  // create
  const [add, { isLoading: adding, isSuccess: added, error }] =
    usePostCastMutation();

  const [update, { isLoading: updating, isSuccess: updated }] =
    usePutCastMutation();

  const [remove, { isLoading: removing, isSuccess: removed }] =
    useDeleteCastMutation();

  // add
  const addCast = async (data: CastFormValues) => {
    try {
      await add(data).unwrap();
      toast.success("Cast added successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Add Cast failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // update
  const updateCast = async (id: string, data: CastFormValues) => {
    try {
      await update({ id, ...data }).unwrap();
      toast.success("Cast updated successfully!", {
        position: "top-center",
        className: "!bg-blue-400 !text-white",
      });
    } catch (error) {
      console.error("Update Cast failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // delete
  const deleteCast = async (id: string) => {
    try {
      await remove({ id }).unwrap();
      toast.success("Cast deleted successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Delete Cast failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  return {
    data,
    gettingCasts,
    getError,
    addCast,
    added,
    adding,
    updating,
    updated,
    deleteCast,
    updateCast,
    removing,
    error,
    removed,
  };
};

export default useCast;
