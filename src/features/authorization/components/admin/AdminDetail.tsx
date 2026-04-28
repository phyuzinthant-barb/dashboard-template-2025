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
import { AdminDetail } from "../../types";

// Forward ref to the AdminDetailBox component
const AdminDetailBox = React.forwardRef<
  HTMLButtonElement,
  {
    setData: React.Dispatch<React.SetStateAction<AdminDetail | null>>;
    data: AdminDetail | null;
  }
>(({ setData, data }, ref) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button ref={ref} className="hidden" variant="outline"></Button>
      </AlertDialogTrigger>
      <AlertDialogContent className=" min-w-[600px] block !p-0">
        <AlertDialogHeader>
          <AlertDialogTitle></AlertDialogTitle>
          {data && (
            <AlertDialogDescription
              className=" !text-dark !mt-0 px-4 py-4"
              asChild
            >
              <div>
                <div className=" -mt-16 size-24 rounded-full ">
                  <img
                    src={data?.profilePictureUrl}
                    className=" object-cover rounded-full size-24"
                    alt=""
                  />
                </div>
                <Button
                  className=" mt-4 h-10 text-blue-600 hover:text-blue-600"
                  variant={"outline"}
                >
                  {data?.role}
                </Button>
                <div className=" mt-4 space-y-4">
                  <div className=" grid grid-cols-1 gap-4">
                    <div className=" flex items-center gap-3 ">
                      <p className=" text-dark text-lg font-semibold">Name :</p>
                      <p className="text-lg">{data?.name}</p>
                    </div>
                    <div className=" flex items-center gap-3 ">
                      <p className=" text-dark text-lg font-semibold">
                        Email :
                      </p>
                      <p className="text-lg">{data?.email}</p>
                    </div>
                    <div className=" flex items-center gap-3 ">
                      <p className=" text-dark text-lg font-semibold">
                        Phone :
                      </p>
                      <p className="text-lg">{data?.phone}</p>
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
              </div>
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
});

export default AdminDetailBox;
