import { toast } from "sonner";
import { getErrorMessage } from "@/utils/errorHandler";
import { useSearchParams } from "react-router-dom";
import {
  useDeleteSeriesMutation,
  usePostSeriesMutation,
  usePutSeriesMutation,
  useSeriesQuery,
} from "../services/seriesService";

const useSeries = () => {
  // get
  const [searchParams] = useSearchParams();

  const {
    data,
    isLoading: gettingSeries,
    error: getError,
  } = useSeriesQuery({
    param: new URLSearchParams(
      Object.fromEntries(
        Array.from(searchParams.entries()).filter(([key]) => key !== "skip")
      )
    ).toString(),
  });

  // create
  const [add, { isLoading: adding, isSuccess: added, error: addError }] =
    usePostSeriesMutation();

  const [update, { isLoading: updating, isSuccess: updated }] =
    usePutSeriesMutation();

  const [remove, { isLoading: removing, isSuccess: removed }] =
    useDeleteSeriesMutation();

  // add
  const addSeries = async (data: any) => {
    try {
      await add(data).unwrap();
      toast.success("Series added successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Add Series failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // update
  const updateSeries = async (id: string, data: any) => {
    try {
      await update({ id, SeriesData: data }).unwrap();
      toast.success("Series updated successfully!", {
        position: "top-center",
        className: "!bg-blue-400 !text-white",
      });
    } catch (error) {
      console.error("Update Series failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // delete
  const deleteSeries = async (id: string) => {
    try {
      await remove({ id }).unwrap();
      toast.success("Series deleted successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Delete Series failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  return {
    data,
    gettingSeries,
    getError,
    addSeries,
    added,
    adding,
    updating,
    updated,
    deleteSeries,
    updateSeries,
    removing,
    removed,
    addError,
  };
};

export default useSeries;
