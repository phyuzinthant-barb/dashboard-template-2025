import { toast } from "sonner";
import {
  useCategoryQuery,
  useDeleteCategoryMutation,
  usePostCategoryMutation,
  usePutCategoryMutation,
} from "../services/categoryService";
import { CategoryFormValues } from "../types";
import { getErrorMessage } from "@/utils/errorHandler";

const useCategory = () => {
  // get
  const {
    data,
    isLoading: gettingCategories,
    error: getError,
  } = useCategoryQuery();

  // create
  const [add, { isLoading: adding, isSuccess: added }] =
    usePostCategoryMutation();

  const [update, { isLoading: updating, isSuccess: updated }] =
    usePutCategoryMutation();

  const [remove, { isLoading: removing, isSuccess: removed }] =
    useDeleteCategoryMutation();

  // add
  const addCategory = async (data: CategoryFormValues) => {
    try {
      await add(data).unwrap();
      toast.success("Category added successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Add category failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // update
  const updateCategory = async (id: string, data: CategoryFormValues) => {
    try {
      await update({ id, ...data }).unwrap();
      toast.success("Category updated successfully!", {
        position: "top-center",
        className: "!bg-blue-400 !text-white",
      });
    } catch (error) {
      console.error("Update category failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // delete
  const deleteCategory = async (id: string) => {
    try {
      await remove({ id }).unwrap();
      toast.success("Category deleted successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Delete category failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  return {
    data,
    gettingCategories,
    getError,
    addCategory,
    added,
    adding,
    updating,
    updated,
    deleteCategory,
    updateCategory,
    removing,
    removed,
  };
};

export default useCategory;
