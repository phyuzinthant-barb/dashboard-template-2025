import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomersDetail } from "../types";

// Forward ref to the CustomersDetailBox component
const CustomersDetailBox = React.forwardRef<
  HTMLButtonElement,
  {
    setData: React.Dispatch<React.SetStateAction<CustomersDetail | null>>;
    data: CustomersDetail | null;
  }
>(({ setData, data }, ref) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button ref={ref} className="hidden" variant="outline"></Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="  min-w-[600px] block !p-0">
        <AlertDialogHeader>
          <AlertDialogTitle className=" p-4 border-b-[1.5px] border-b-blue-800">
            Customer Detail
          </AlertDialogTitle>
          <AlertDialogDescription
            className=" !text-dark !mt-0 px-4 py-4"
            asChild
          >
            <div className=" space-y-4">
              <div className=" grid grid-cols-1 gap-4">
                <div className="  size-24 rounded-full ">
                  <img
                    src={data?.profilePictureUrl}
                    className=" object-cover rounded-full size-24"
                    alt=""
                  />
                </div>
                <div className=" space-y-2">
                  <p className=" text-dark text-lg font-semibold"> Name</p>
                  <Input readOnly value={data?.name} />
                </div>

                <div className=" space-y-2">
                  <p className=" text-dark text-lg font-semibold">Email</p>
                  <Input readOnly value={data?.email} />
                </div>

                <div className=" col-span-full space-y-2">
                  <p className=" text-dark text-lg font-semibold">Pacakge</p>
                  <Input readOnly value={data?.package} />
                </div>
              </div>

              <div className=" flex justify-end">
                <AlertDialogCancel
                  onClick={() => setData(null)}
                  className=" w-[120px] h-11"
                >
                  Close
                </AlertDialogCancel>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
});

export default CustomersDetailBox;
