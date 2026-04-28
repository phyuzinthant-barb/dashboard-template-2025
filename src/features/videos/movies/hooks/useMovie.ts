import { toast } from "sonner";
import { getErrorMessage } from "@/utils/errorHandler";
import { useSearchParams } from "react-router-dom";
import {
  useDeleteMovieMutation,
  useMovieQuery,
  usePostMovieMutation,
  usePutMovieMutation,
} from "../services/movieService";

const useMovie = () => {
  // get
  const [searchParams] = useSearchParams();

  const {
    data,
    isLoading: gettingMovies,
    error: getError,
  } = useMovieQuery({
    param: new URLSearchParams(
      Object.fromEntries(
        Array.from(searchParams.entries()).filter(([key]) => key !== "skip")
      )
    ).toString(),
  });

  // create
  const [add, { isLoading: adding, isSuccess: added, error: addError }] =
    usePostMovieMutation();

  const [
    update,
    { isLoading: updating, isSuccess: updated, error: updateError },
  ] = usePutMovieMutation();

  const [remove, { isLoading: removing, isSuccess: removed }] =
    useDeleteMovieMutation();

  // add
  const addMovie = async (data: any) => {
    try {
      await add(data).unwrap();
      toast.success("Movie added successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Add Movie failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // update
  const updateMovie = async (id: string, data: any) => {
    try {
      await update({ id, movieData: data }).unwrap();
      toast.success("Movie updated successfully!", {
        position: "top-center",
        className: "!bg-blue-400 !text-white",
      });
    } catch (error) {
      console.error("Update Movie failed", error);
      toast.error("Something went wrong,Please try again!", {
        position: "top-center",
      });
    }
  };

  // delete
  const deleteMovie = async (id: string) => {
    try {
      await remove({ id }).unwrap();
      toast.success("Movie deleted successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Delete Movie failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  return {
    data,
    gettingMovies,
    getError,
    addMovie,
    added,
    adding,
    updating,
    updated,
    deleteMovie,
    updateMovie,
    updateError,
    removing,
    removed,
    addError,
  };
};

export default useMovie;
