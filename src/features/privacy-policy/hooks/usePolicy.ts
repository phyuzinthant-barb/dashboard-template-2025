import { toast } from "sonner";

import { PolicyFormValues } from "../types";
import { getErrorMessage } from "@/utils/errorHandler";
import {
  usePolicyQuery,
  useDeletePolicyMutation,
  usePostPolicyMutation,
  usePutPolicyMutation,
} from "../services/policyService";

const usePolicy = () => {
  // get
  const { data, isLoading: gettingPolicy, error: getError } = usePolicyQuery();

  // create
  const [add, { isLoading: adding, isSuccess: added }] =
    usePostPolicyMutation();

  const [update, { isLoading: updating, isSuccess: updated }] =
    usePutPolicyMutation();

  const [remove, { isLoading: removing, isSuccess: removed }] =
    useDeletePolicyMutation();

  // add
  const addPolicy = async (data: PolicyFormValues) => {
    try {
      await add(data).unwrap();
      toast.success("Policy added successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Add Policy failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // update
  const updatePolicy = async (data: PolicyFormValues) => {
    try {
      await update({ ...data }).unwrap();
      toast.success("Policy updated successfully!", {
        position: "top-center",
        className: "!bg-blue-400 !text-white",
      });
    } catch (error) {
      console.error("Update Policy failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // delete
  const deletePolicy = async (id: string) => {
    try {
      await remove({ id }).unwrap();
      toast.success("Policy deleted successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Delete Policy failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  return {
    data,
    gettingPolicy,
    getError,
    addPolicy,
    added,
    adding,
    updating,
    updated,
    deletePolicy,
    updatePolicy,
    removing,
    removed,
  };
};

export default usePolicy;
