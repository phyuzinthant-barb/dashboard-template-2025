import { toast } from "sonner";
import { getErrorMessage } from "@/utils/errorHandler";
import {
  usePutReminderMutation,
  useReminderQuery,
} from "../services/reminderService";

const useReminder = () => {
  const { data, isLoading: gettingData } = useReminderQuery();

  // update
  const [update, { isLoading: updating, isSuccess: updated }] =
    usePutReminderMutation();

  // update
  const updateReminder = async (data: number) => {
    try {
      await update({ days: data }).unwrap();
    toast.success("Setting updated successfully!", {
        position: "top-center",
        className: "!bg-blue-400 !text-white",
      });
    } catch (error) {
      console.error("Update Setting failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  return {
    updating,
    updated,
    updateReminder,
    gettingData,
    data,
  };
};

export default useReminder;
