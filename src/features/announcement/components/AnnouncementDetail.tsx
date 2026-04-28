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
import { AnnouncementDetail } from "../types";
import { Textarea } from "@/components/ui/textarea";

// Forward ref to the AnnouncementDetailBox component
const AnnouncementDetailBox = React.forwardRef<
  HTMLButtonElement,
  {
    setData: React.Dispatch<React.SetStateAction<AnnouncementDetail | null>>;
    data: AnnouncementDetail | null;
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
            Announcement Detail
          </AlertDialogTitle>
          <AlertDialogDescription
            className=" !text-dark !mt-0 px-4 py-4"
            asChild
          >
            <div className=" space-y-4">
              <div className=" space-y-2">
                <p className=" text-dark text-lg font-semibold">Subject</p>
                <Input readOnly value={data?.title} />
              </div>
              <div className=" space-y-2">
                <p className=" text-dark text-lg font-semibold">Description</p>
                <Textarea rows={6} readOnly value={data?.body} />
              </div>

              <div className=" space-y-2">
                <p className=" text-dark text-lg font-semibold">Image</p>
                <img
                  src={data?.image}
                  className=" h-[300px] object-cover rounded-lg"
                  alt=""
                />
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

export default AnnouncementDetailBox;
