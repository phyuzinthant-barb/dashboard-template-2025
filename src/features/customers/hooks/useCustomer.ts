import { toast } from "sonner";
import { getErrorMessage } from "@/utils/errorHandler";
import { CustomersFormValues } from "../types";
import {
  useDeleteCustomersMutation,
  useCustomersQuery,
  usePostCustomersMutation,
  usePutCustomersMutation,
} from "../services/customerServices";
import { useSearchParams } from "react-router-dom";

const useCustomers = () => {
  const [searchParams] = useSearchParams();

  // get
  const {
    data,
    isLoading: gettingCustomers,
    error: getError,
  } = useCustomersQuery({
    param: `${new URLSearchParams(
      Object.fromEntries(
        Array.from(searchParams.entries()).filter(([key]) => key !== "skip")
      )
    ).toString()}&isBanned=false`,
  });

  // create
  const [add, { isLoading: adding, isSuccess: added }] =
    usePostCustomersMutation();

  const [update, { isLoading: updating, isSuccess: updated }] =
    usePutCustomersMutation();

  const [remove, { isLoading: removing, isSuccess: removed }] =
    useDeleteCustomersMutation();

  // add
  const addCustomers = async (data: CustomersFormValues) => {
    try {
      await add({ data }).unwrap();
      toast.success("Customers added successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Add Customers failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // update
  const banCustomers = async (id: string) => {
    try {
      await update({ id }).unwrap();
      toast.success("Customers updated successfully!", {
        position: "top-center",
        className: "!bg-blue-400 !text-white",
      });
    } catch (error) {
      console.error("Update Customers failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  // delete
  const deleteCustomers = async (id: string) => {
    try {
      await remove({ id }).unwrap();
      toast.success("Customers deleted successfully!", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      console.error("Delete Customers failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  return {
    data,
    gettingCustomers,
    getError,
    addCustomers,
    added,
    adding,
    updating,
    updated,
    deleteCustomers,
    banCustomers,
    removing,
    removed,
  };
};

export default useCustomers;
