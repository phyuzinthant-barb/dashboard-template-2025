import { toast } from "sonner";

import { AnnouncementFormValues } from "../types";
import { getErrorMessage } from "@/utils/errorHandler";
import {
  useAnnouncementQuery,
  useDeleteAnnouncementMutation,
  usePostAnnouncementMutation,
  usePutAnnouncementMutation,
} from "../services/announcementService";

const useAnnouncement = () => {
  // get
  const {
    data,
    isLoading: gettingAnnouncement,
    error: getError,
  } = useAnnouncementQuery();

  // create
  const [add, { isLoading: adding, isSuccess: added }] =
    usePostAnnouncementMutation();

  const [update, { isLoading: updating, isSuccess: updated }] =
    usePutAnnouncementMutation();

  const [remove, { isLoading: removing, isSuccess: removed }] =
    useDeleteAnnouncementMutation();

  // add
  const addAnnouncement = async (data: AnnouncementFormValues) => {
    try {
      await add(data).unwrap();
      toast.success("Announcement added successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Add Announcement failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // update
  const updateAnnouncement = async (
    id: string,
    data: AnnouncementFormValues
  ) => {
    try {
      await update({ id, data }).unwrap();
      toast.success("Announcement updated successfully!", {
        position: "top-center",
        className: "!bg-blue-400 !text-white",
      });
    } catch (error) {
      console.error("Update Announcement failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // delete
  const deleteAnnouncement = async (id: string) => {
    try {
      await remove({ id }).unwrap();
      toast.success("Announcement deleted successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Delete Announcement failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  return {
    data,
    gettingAnnouncement,
    getError,
    addAnnouncement,
    added,
    adding,
    updating,
    updated,
    deleteAnnouncement,
    updateAnnouncement,
    removing,
    removed,
  };
};

export default useAnnouncement;
