import { toast } from "sonner";

import { AdsFormValues } from "../types";
import { getErrorMessage } from "@/utils/errorHandler";
import {
  useAdsQuery,
  useDeleteAdsMutation,
  usePostAdsMutation,
  usePutAdsMutation,
} from "../services/adsService";

const useAds = () => {
  // get
  const { data, isLoading: gettingAds, error: getError } = useAdsQuery();

  // create
  const [add, { isLoading: adding, isSuccess: added }] = usePostAdsMutation();

  const [update, { isLoading: updating, isSuccess: updated }] =
    usePutAdsMutation();

  const [remove, { isLoading: removing, isSuccess: removed }] =
    useDeleteAdsMutation();

  // add
  const addAds = async (data: AdsFormValues) => {
    try {
      await add(data).unwrap();
      toast.success("Ads added successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Add Ads failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // update
  const updateAds = async (id: string, data: AdsFormValues) => {
    try {
      await update({ id, data }).unwrap();
      toast.success("Ads updated successfully!", {
        position: "top-center",
        className: "!bg-blue-400 !text-white",
      });
    } catch (error) {
      console.error("Update Ads failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // delete
  const deleteAds = async (id: string) => {
    try {
      await remove({ id }).unwrap();
      toast.success("Ads deleted successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Delete Ads failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  return {
    data,
    gettingAds,
    getError,
    addAds,
    added,
    adding,
    updating,
    updated,
    deleteAds,
    updateAds,
    removing,
    removed,
  };
};

export default useAds;
