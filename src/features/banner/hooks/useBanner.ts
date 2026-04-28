import { toast } from "sonner";

import { BannerFormValues } from "../types";
import { getErrorMessage } from "@/utils/errorHandler";
import {
  useBannerQuery,
  useDeleteBannerMutation,
  usePostBannerMutation,
  usePutBannerMutation,
} from "../services/bannerService";

const useBanner = () => {
  // get
  const { data, isLoading: gettingBanners, error: getError } = useBannerQuery();

  // create
  const [add, { isLoading: adding, isSuccess: added }] =
    usePostBannerMutation();

  const [update, { isLoading: updating, isSuccess: updated }] =
    usePutBannerMutation();

  const [remove, { isLoading: removing, isSuccess: removed }] =
    useDeleteBannerMutation();

  // add
  const addBanner = async (data: BannerFormValues) => {
    try {
      await add(data).unwrap();
      toast.success("Banner added successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Add Banner failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // update
  const updateBanner = async (id: string, data: BannerFormValues) => {
    try {
      await update({ id, ...data }).unwrap();
      toast.success("Banner updated successfully!", {
        position: "top-center",
        className: "!bg-blue-400 !text-white",
      });
    } catch (error) {
      console.error("Update Banner failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // delete
  const deleteBanner = async (id: string) => {
    try {
      await remove({ id }).unwrap();
      toast.success("Banner deleted successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Delete Banner failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  return {
    data,
    gettingBanners,
    getError,
    addBanner,
    added,
    adding,
    updating,
    updated,
    deleteBanner,
    updateBanner,
    removing,
    removed,
  };
};

export default useBanner;
