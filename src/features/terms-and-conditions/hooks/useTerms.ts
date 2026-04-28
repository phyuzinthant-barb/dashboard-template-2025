import { toast } from "sonner";

import { TermsFormValues } from "../types";
import { getErrorMessage } from "@/utils/errorHandler";
import {
  useTermsQuery,
  useDeleteTermsMutation,
  usePostTermsMutation,
  usePutTermsMutation,
} from "../services/termsService";

const useTerms = () => {
  // get
  const { data, isLoading: gettingTerms, error: getError } = useTermsQuery();

  // create
  const [add, { isLoading: adding, isSuccess: added }] = usePostTermsMutation();

  const [update, { isLoading: updating, isSuccess: updated }] =
    usePutTermsMutation();

  const [remove, { isLoading: removing, isSuccess: removed }] =
    useDeleteTermsMutation();

  // add
  const addTerms = async (data: TermsFormValues) => {
    try {
      await add(data).unwrap();
      toast.success("Terms added successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Add Terms failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // update
  const updateTerms = async (data: TermsFormValues) => {
    try {
      await update({ ...data }).unwrap();
      toast.success("Terms updated successfully!", {
        position: "top-center",
        className: "!bg-blue-400 !text-white",
      });
    } catch (error) {
      console.error("Update Terms failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // delete
  const deleteTerms = async (id: string) => {
    try {
      await remove({ id }).unwrap();
      toast.success("Terms deleted successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Delete Terms failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  return {
    data,
    gettingTerms,
    getError,
    addTerms,
    added,
    adding,
    updating,
    updated,
    deleteTerms,
    updateTerms,
    removing,
    removed,
  };
};

export default useTerms;
