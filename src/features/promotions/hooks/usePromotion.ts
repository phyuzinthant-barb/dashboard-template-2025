import { toast } from "sonner";
import { getErrorMessage } from "@/utils/errorHandler";
import { EditPromotionFormValues, PromotionFormValues } from "../types";
import {
  useDeletePromotionsMutation,
  usePostPromotionsMutation,
  usePromotionsQuery,
  usePutPromotionsMutation,
} from "../services/promotionServices";

const usePromotion = () => {
  // get
  const {
    data,
    isLoading: gettingPromotions,
    error: getError,
  } = usePromotionsQuery();

  // create
  const [add, { isLoading: adding, isSuccess: added }] =
    usePostPromotionsMutation();

  const [update, { isLoading: updating, isSuccess: updated }] =
    usePutPromotionsMutation();

  const [remove, { isLoading: removing, isSuccess: removed }] =
    useDeletePromotionsMutation();

  // add
  const addPromotion = async (data: PromotionFormValues) => {
    try {
      await add({ data }).unwrap();
      toast.success("Promotion added successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Add Promotion failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // update
  const updatePromotion = async (id: string, data: EditPromotionFormValues) => {
    try {
      await update({ id, data }).unwrap();
      toast.success("Promotion updated successfully!", {
        position: "top-center",
        className: "!bg-blue-400 !text-white",
      });
    } catch (error) {
      console.error("Update Promotion failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // delete
  const deletePromotion = async (id: string) => {
    try {
      await remove({ id }).unwrap();
      toast.success("Promotion deleted successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Delete Promotion failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  return {
    data,
    gettingPromotions,
    getError,
    addPromotion,
    added,
    adding,
    updating,
    updated,
    deletePromotion,
    updatePromotion,
    removing,
    removed,
  };
};

export default usePromotion;
