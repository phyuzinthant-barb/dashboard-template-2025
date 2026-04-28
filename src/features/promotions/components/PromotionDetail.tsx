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
import { PromotionDetail } from "../types";
import { formatDate } from "date-fns";

// Forward ref to the PromotionDetailBox component
const PromotionDetailBox = React.forwardRef<
  HTMLButtonElement,
  {
    setData: React.Dispatch<React.SetStateAction<PromotionDetail | null>>;
    data: PromotionDetail | null;
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
            Promotion Detail
          </AlertDialogTitle>
          <AlertDialogDescription
            className=" !text-dark !mt-0 px-4 py-4"
            asChild
          >
            <div className=" space-y-4">
              <div className=" grid grid-cols-2 gap-4">
                <div className=" space-y-2">
                  <p className=" text-dark text-lg font-semibold">Name</p>
                  <Input readOnly value={data?.name} />
                </div>

                <div className=" space-y-2">
                  <p className=" text-dark text-lg font-semibold">Plan Name</p>
                  <Input readOnly value={data?.plan} />
                </div>

                <div className=" col-span-full space-y-2">
                  <p className=" text-dark text-lg font-semibold">Discount</p>
                  <Input readOnly value={data?.discount + " days"} />
                </div>

                {data && (
                  <div className=" col-span-full space-y-2">
                    <p className=" text-dark text-lg font-semibold">Period</p>
                    <Input
                      readOnly
                      value={`${formatDate(
                        new Date(data?.startDate || ""),
                        "MMM, dd, yyyy"
                      )}- ${formatDate(
                        new Date(data?.endDate || ""),
                        "MMM, dd, yyyy"
                      )}`}
                    />
                  </div>
                )}
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

export default PromotionDetailBox;
