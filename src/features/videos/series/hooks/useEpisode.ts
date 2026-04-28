import { toast } from "sonner";
import { getErrorMessage } from "@/utils/errorHandler";
import {
  useDeleteEpisodesMutation,
  useEpisodesQuery,
  usePostEpisodesMutation,
  usePutEpisodesMutation,
} from "../services/episodeService";

const useEpisodes = () => {
  const {
    data,
    isLoading: gettingEpisodes,
    error: getError,
  } = useEpisodesQuery();

  // create
  const [add, { isLoading: adding, isSuccess: added, error: addError }] =
    usePostEpisodesMutation();

  const [
    update,
    { isLoading: updating, isSuccess: updated, error: updateError },
  ] = usePutEpisodesMutation();

  const [remove, { isLoading: removing, isSuccess: removed }] =
    useDeleteEpisodesMutation();

  // add
  const addEpisodes = async (data: any) => {
    try {
      await add(data).unwrap();
      toast.success("Episodes added successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Add Episodes failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // update
  const updateEpisodes = async (id: string, data: any) => {
    try {
      if (data.trailerUrl === "") {
        delete data.trailerUrl;
      }
      await update({ id, data }).unwrap();
      toast.success("Episodes updated successfully!", {
        position: "top-center",
        className: "!bg-blue-400 !text-white",
      });
    } catch (error) {
      console.error("Update Episodes failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // delete
  const deleteEpisodes = async (id: string) => {
    try {
      await remove({ id }).unwrap();
      toast.success("Episodes deleted successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Delete Episodes failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  return {
    data,
    gettingEpisodes,
    getError,
    addEpisodes,
    added,
    adding,
    updating,
    updated,
    updateError,
    deleteEpisodes,
    updateEpisodes,
    removing,
    removed,
    addError,
  };
};

export default useEpisodes;
