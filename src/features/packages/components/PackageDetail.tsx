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
import { PackageDetail } from "../types";
import { Textarea } from "@/components/ui/textarea";

// Forward ref to the PackageDetailBox component
const PackageDetailBox = React.forwardRef<
  HTMLButtonElement,
  {
    setData: React.Dispatch<React.SetStateAction<PackageDetail | null>>;
    data: PackageDetail | null;
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
            Package Detail
          </AlertDialogTitle>
          <AlertDialogDescription
            className=" !text-dark !mt-0 px-4 py-4"
            asChild
          >
            <div className=" space-y-4">
              <div className=" grid grid-cols-2 gap-4">
                <div className=" space-y-2">
                  <p className=" text-dark text-lg font-semibold">Plan Name</p>
                  <Input readOnly value={data?.name} />
                </div>

                <div className=" space-y-2">
                  <p className=" text-dark text-lg font-semibold">Duration</p>
                  <Input readOnly value={data?.duration} />
                </div>

                <div className=" col-span-full space-y-2">
                  <p className=" text-dark text-lg font-semibold">Price</p>
                  <Input readOnly value={data?.price} />
                </div>

                <div className=" col-span-full space-y-2">
                  <p className=" text-dark text-lg font-semibold">
                    Description
                  </p>
                  <Textarea rows={6} readOnly value={data?.description} />
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

export default PackageDetailBox;
