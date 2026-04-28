import React, { forwardRef, useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import usePackage from "../hooks/usePackage";

type Status = {
  id: string;
  status: string;
};

const TogglePublishBox = forwardRef<
  HTMLButtonElement,
  {
    setEditData: React.Dispatch<React.SetStateAction<Status | null>>;
    editData: Status | null;
  }
>(({ setEditData, editData }, ref) => {
  const PackageSchema = z.object({
    status: z.boolean(),
  });

  const closeRef = useRef<HTMLButtonElement | null>(null);

  const [open, setOpen] = useState(false);

  const { updatePackage, updating, updated } = usePackage();

  useEffect(() => {
    if (updated) {
      setOpen(false);
    }
  }, [updated]);

  useEffect(() => {
    if (editData) {
      setOpen(true);
    }
  }, [editData]);

  const onSubmit = async (values: z.infer<typeof PackageSchema>) => {
    if (!editData?.id) return;
    await updatePackage(editData.id, values);
  };

  useEffect(() => {
    if (!open) {
      setEditData(null);
    }
  }, [open, setEditData]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button ref={ref} className="hidden" variant="outline"></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className=" size-24 shadow-lg flex justify-center items-center rounded-full bg-white -mt-16 self-center">
            <Icon
              icon={"material-symbols-light:public-off-sharp"}
              className=" size-20"
              color="blue"
            />
          </div>
          <AlertDialogTitle className=" text-lg text-center">
            ARE YOU SURE?
          </AlertDialogTitle>

          <AlertDialogDescription className=" text-lg text-center">
            Do you want to {editData?.status ? "Unpublish" : "Publish"} this
            Package?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex gap-3 items-center justify-center">
          <AlertDialogCancel ref={closeRef} disabled={updating} type="button">
            Cancel
          </AlertDialogCancel>
          <Button
            size={"lg"}
            className="!px-8"
            disabled={updating}
            onClick={() =>
              onSubmit({
                status: editData?.status ? false : true,
              })
            }
            type="submit"
          >
            {updating
              ? "Updating..."
              : `${editData?.status ? "Unpublish" : "Publish"}`}
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
});

export default TogglePublishBox;
