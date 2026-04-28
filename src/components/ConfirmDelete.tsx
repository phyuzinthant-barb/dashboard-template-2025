import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { forwardRef } from "react";
import img from "../assets/images/deleteicon.svg";

interface DeleteProps {
  run: () => void;
  cancel: () => void;
}

const ConfirmDelete = forwardRef<HTMLButtonElement, DeleteProps>(
  ({ run, cancel }, ref) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button ref={ref} className="hidden" variant="outline"></Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className=" size-24 shadow-lg flex justify-center items-center rounded-full bg-white -mt-16 self-center">
              <img src={img} className=" size-16 self-center" />
            </div>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => cancel()}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={run}>Yes, delete!</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);

export default ConfirmDelete;
