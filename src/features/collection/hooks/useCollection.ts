import { toast } from "sonner";

import { CollectionFormValues } from "../types";
import { getErrorMessage } from "@/utils/errorHandler";
import {
  useCollectionQuery,
  usePostCollectionMutation,
  usePutCollectionMutation,
  useDeleteCollectionMutation,
} from "../services/collectionService";

const useCollection = () => {
  // get
  const {
    data,
    isLoading: gettingCategories,
    error: getError,
  } = useCollectionQuery();

  // create
  const [add, { isLoading: adding, isSuccess: added }] =
    usePostCollectionMutation();

  const [update, { isLoading: updating, isSuccess: updated }] =
    usePutCollectionMutation();

  const [remove, { isLoading: removing, isSuccess: removed }] =
    useDeleteCollectionMutation();

  // add
  const addCollection = async (data: CollectionFormValues) => {
    try {
      await add(data).unwrap();
      toast.success("Collection added successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Add Collection failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // update
  const updateCollection = async (id: string, data: CollectionFormValues) => {
    try {
      await update({ id, ...data }).unwrap();
      toast.success("Collection updated successfully!", {
        position: "top-center",
        className: "!bg-blue-400 !text-white",
      });
    } catch (error) {
      console.error("Update Collection failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // delete
  const deleteCollection = async (id: string) => {
    try {
      await remove({ id }).unwrap();
      toast.success("Collection deleted successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Delete Collection failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  return {
    data,
    gettingCategories,
    getError,
    addCollection,
    added,
    adding,
    updating,
    updated,
    deleteCollection,
    updateCollection,
    removing,
    removed,
  };
};

export default useCollection;
