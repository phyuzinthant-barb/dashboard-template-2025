import { toast } from "sonner";
import { getErrorMessage } from "@/utils/errorHandler";
import {
  useDeleteSeasonMutation,
  usePostSeasonMutation,
  usePutSeasonMutation,
  useSeasonQuery,
} from "../services/seasonService";

const useSeason = () => {
  const { data, isLoading: gettingSeason, error: getError } = useSeasonQuery();

  // create
  const [add, { isLoading: adding, isSuccess: added, error: addError }] =
    usePostSeasonMutation();

  const [update, { isLoading: updating, isSuccess: updated }] =
    usePutSeasonMutation();

  const [remove, { isLoading: removing, isSuccess: removed }] =
    useDeleteSeasonMutation();

  // add
  const addSeason = async (data: any) => {
    try {
      await add(data).unwrap();
      toast.success("Season added successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Add Season failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // update
  const updateSeason = async (id: string, data: any) => {
    try {
      await update({ id, SeasonData: data }).unwrap();
      toast.success("Season updated successfully!", {
        position: "top-center",
        className: "!bg-blue-400 !text-white",
      });
    } catch (error) {
      console.error("Update Season failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // delete
  const deleteSeason = async (id: string) => {
    try {
      await remove({ id }).unwrap();
      toast.success("Season deleted successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Delete Season failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  return {
    data,
    gettingSeason,
    getError,
    addSeason,
    added,
    adding,
    updating,
    updated,
    deleteSeason,
    updateSeason,
    removing,
    removed,
    addError,
  };
};

export default useSeason;
