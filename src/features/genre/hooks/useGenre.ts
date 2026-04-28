import { toast } from "sonner";
import {
  useGenreQuery,
  useDeleteGenreMutation,
  usePostGenreMutation,
  usePutGenreMutation,
} from "../services/genreService";
import { GenreFormValues } from "../types";
import { getErrorMessage } from "@/utils/errorHandler";
import { useSearchParams } from "react-router-dom";

const useGenre = () => {
  const [searchParams] = useSearchParams();

  // get
  const {
    data,
    isLoading: gettingGenres,
    error: getError,
  } = useGenreQuery({
    param: new URLSearchParams(
      Object.fromEntries(
        Array.from(searchParams.entries()).filter(([key]) => key !== "skip")
      )
    ).toString(),
  });

  // create
  const [add, { isLoading: adding, isSuccess: added }] = usePostGenreMutation();

  const [update, { isLoading: updating, isSuccess: updated }] =
    usePutGenreMutation();

  const [remove, { isLoading: removing, isSuccess: removed }] =
    useDeleteGenreMutation();

  // add
  const addGenre = async (data: GenreFormValues) => {
    try {
      await add(data).unwrap();
      toast.success("Genre added successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Add Genre failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // update
  const updateGenre = async (id: string, data: GenreFormValues) => {
    try {
      await update({ id, ...data }).unwrap();
      toast.success("Genre updated successfully!", {
        position: "top-center",
        className: "!bg-blue-400 !text-white",
      });
    } catch (error) {
      console.error("Update Genre failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // delete
  const deleteGenre = async (id: string) => {
    try {
      await remove({ id }).unwrap();
      toast.success("Genre deleted successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Delete Genre failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  return {
    data,
    gettingGenres,
    getError,
    addGenre,
    added,
    adding,
    updating,
    updated,
    deleteGenre,
    updateGenre,
    removing,
    removed,
  };
};

export default useGenre;
