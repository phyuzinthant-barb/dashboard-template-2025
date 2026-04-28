import React, { useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import useRole from "../hooks/useRole";

// Forward ref to the AddRoleBox component
const AddRoleBox = React.forwardRef<HTMLButtonElement>((_, ref) => {
  const RoleSchema = z.object({
    role: z.string().min(1, "Role is required"),
  });

  const [open, setOpen] = useState(false);

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(RoleSchema),
  });

  const { addRole, adding, added } = useRole();

  type RoleFormValues = z.infer<typeof RoleSchema>;

  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (added) {
      setOpen(false);
      form.reset();
    }
  }, [added, form]);

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <Button ref={ref} className="hidden" variant="outline"></Button>
      </AlertDialogTrigger>
      <Form {...form}>
        <AlertDialogContent className="  min-w-[600px] block !p-0">
          <AlertDialogHeader>
            <AlertDialogTitle className=" p-4 border-b-[1.5px] border-b-blue-800">
              Add New Role
            </AlertDialogTitle>
            <AlertDialogDescription
              className=" !text-dark !mt-0 px-4 py-4"
              asChild
            >
              <form onSubmit={form.handleSubmit(addRole)}>
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2.5">New Role</FormLabel>
                      <FormControl>
                        <Input {...field} className=" !border-[1px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex mt-4 gap-3 justify-end">
                  <AlertDialogCancel
                    ref={closeRef}
                    onClick={() => form.reset()}
                    disabled={adding}
                    type="button"
                  >
                    Cancel
                  </AlertDialogCancel>
                  <Button
                    size={"lg"}
                    className=" !px-8"
                    disabled={adding}
                    type="submit"
                  >
                    Create
                  </Button>
                </div>
              </form>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </Form>
    </AlertDialog>
  );
});

export default AddRoleBox;
