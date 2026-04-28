import { toast } from "sonner";
import { getErrorMessage } from "@/utils/errorHandler";
import { EditPackageFormValues, PackageFormValues } from "../types";
import {
  useDeletePackagesMutation,
  usePackagesQuery,
  usePostPackagesMutation,
  usePutPackagesMutation,
} from "../services/packageServices";
import { useSearchParams } from "react-router-dom";

const usePackage = () => {
  const [searchParams] = useSearchParams();

  // get
  const {
    data,
    isLoading: gettingPackages,
    error: getError,
  } = usePackagesQuery({
    param: new URLSearchParams(
      Object.fromEntries(
        Array.from(searchParams.entries()).filter(([key]) => key !== "skip")
      )
    ).toString(),
  });

  // create
  const [add, { isLoading: adding, isSuccess: added }] =
    usePostPackagesMutation();

  const [update, { isLoading: updating, isSuccess: updated }] =
    usePutPackagesMutation();

  const [remove, { isLoading: removing, isSuccess: removed }] =
    useDeletePackagesMutation();

  // add
  const addPackage = async (data: PackageFormValues) => {
    try {
      await add({ data }).unwrap();
      toast.success("Package added successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Add Package failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // update
  const updatePackage = async (id: string, data: EditPackageFormValues) => {
    try {
      await update({ id, data }).unwrap();
      toast.success("Package updated successfully!", {
        position: "top-center",
        className: "!bg-blue-400 !text-white",
      });
    } catch (error) {
      console.error("Update Package failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // delete
  const deletePackage = async (id: string) => {
    try {
      await remove({ id }).unwrap();
      toast.success("Package deleted successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Delete Package failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  return {
    data,
    gettingPackages,
    getError,
    addPackage,
    added,
    adding,
    updating,
    updated,
    deletePackage,
    updatePackage,
    removing,
    removed,
  };
};

export default usePackage;
