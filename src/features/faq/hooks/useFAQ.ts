import { toast } from "sonner";
import {
  useFAQQuery,
  useDeleteFAQMutation,
  usePostFAQMutation,
  usePutFAQMutation,
} from "../services/faqService";
import { FAQFormValues } from "../types";
import { getErrorMessage } from "@/utils/errorHandler";

const useFAQ = () => {
  // get
  const { data, isLoading: gettingCategories, error: getError } = useFAQQuery();

  // create
  const [add, { isLoading: adding, isSuccess: added }] = usePostFAQMutation();

  const [update, { isLoading: updating, isSuccess: updated }] =
    usePutFAQMutation();

  const [remove, { isLoading: removing, isSuccess: removed }] =
    useDeleteFAQMutation();

  // add
  const addFAQ = async (data: FAQFormValues) => {
    try {
      await add(data).unwrap();
      toast.success("FAQ added successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Add FAQ failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // update
  const updateFAQ = async (id: string, data: FAQFormValues) => {
    try {
      await update({ id, data }).unwrap();
      toast.success("FAQ updated successfully!", {
        position: "top-center",
        className: "!bg-blue-400 !text-white",
      });
    } catch (error) {
      console.error("Update FAQ failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // delete
  const deleteFAQ = async (id: string) => {
    try {
      await remove({ id }).unwrap();
      toast.success("FAQ deleted successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Delete FAQ failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  return {
    data,
    gettingCategories,
    getError,
    addFAQ,
    added,
    adding,
    updating,
    updated,
    deleteFAQ,
    updateFAQ,
    removing,
    removed,
  };
};

export default useFAQ;
