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
import useCast from "../hooks/useCast";
import { Plus } from "lucide-react";
import { Icon } from "@iconify/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useRole from "@/features/role/hooks/useRole";

// Forward ref to the AddCastBox component
const AddCastBox = React.forwardRef<HTMLButtonElement>((_, ref) => {
  const { data: roleData } = useRole();
  const { addCast, adding, added } = useCast();

  const castSchema = z.object({
    name: z.string().min(1, "Name is required"),
    profilePicture: z.instanceof(File),
    role: z.string().min(1, "Role is required"),
  });

  const [profile, setProfile] = useState<File | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [open, setOpen] = useState(false);

  const form = useForm<CastFormValues>({
    resolver: zodResolver(castSchema),
  });

  type CastFormValues = z.infer<typeof castSchema>;

  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (added) {
      setOpen(false);
      form.reset();
      setProfile(null);
    }
  }, [added, form]);

  useEffect(() => {
    if (form.getValues("profilePicture")) {
      setProfile(form.getValues("profilePicture"));
    }
  }, [form.watch("profilePicture")]);

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <Button ref={ref} className="hidden" variant="outline"></Button>
      </AlertDialogTrigger>
      <Form {...form}>
        <AlertDialogContent className="  min-w-[600px] block !p-0">
          <AlertDialogHeader>
            <AlertDialogTitle className=" p-4 border-b-[1.5px] border-b-blue-800">
              Add New Cast
            </AlertDialogTitle>
            <AlertDialogDescription
              className=" !text-dark !mt-0 px-4 py-4"
              asChild
            >
              <form
                className=" space-y-4"
                onSubmit={form.handleSubmit(addCast)}
              >
                <FormField
                  control={form.control}
                  name="profilePicture"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div>
                          <div
                            onClick={() => {
                              inputRef.current?.click();
                            }}
                            className="w-[120px] bg-stone-100 z-[100] h-[120px] rounded-full shadow-md flex justify-center items-center relative border-3 border-white cursor-pointer dark:text-dark"
                          >
                            {profile ? (
                              <img
                                className=" w-full h-full rounded-full object-cover"
                                src={URL.createObjectURL(profile)}
                                alt=""
                              />
                            ) : (
                              <Icon
                                color="gray"
                                className=" size-24"
                                icon={"fluent:person-20-filled"}
                              />
                            )}
                            <div className=" -right-3 p-2 bg-white rounded-full -bottom-2 absolute size-12">
                              <Plus />
                            </div>
                          </div>
                          <input
                            type="file"
                            ref={inputRef}
                            accept="image/*"
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0])
                            }
                            className=" hidden"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2.5"> Name</FormLabel>
                      <FormControl>
                        <Input {...field} className=" !border-[1px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className=" ">
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className=" h-11 bg-gray border-[1px]  border-dark/30">
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roleData?.data.map((item: any) => (
                            <SelectItem key={item._id} value={item._id}>
                              {item.role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex mt-4 gap-3 items-center justify-end">
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

export default AddCastBox;
