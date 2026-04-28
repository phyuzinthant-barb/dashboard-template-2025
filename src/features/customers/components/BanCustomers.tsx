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
import { UserMinus } from "lucide-react";
import { forwardRef } from "react";

interface DeleteProps {
  run: () => void;
  cancel: () => void;
  ban?: boolean;
}

const BanCustomerBox = forwardRef<HTMLButtonElement, DeleteProps>(
  ({ run, cancel, ban = true }, ref) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button ref={ref} className="hidden" variant="outline"></Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className=" size-24 shadow-lg flex justify-center items-center rounded-full bg-white -mt-16 self-center">
              <UserMinus className="text-red-500 size-16" />
            </div>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => cancel()}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={run}>
              Yes, {ban ? "ban" : "unban"} him now!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);

export default BanCustomerBox;
