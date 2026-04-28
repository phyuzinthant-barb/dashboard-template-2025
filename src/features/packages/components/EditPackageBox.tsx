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
import usePackage from "../hooks/usePackage";
import { Textarea } from "@/components/ui/textarea";

type Package = {
  id: string;
  duration: number;
  price: number;
  description: string;
  name: string;
};

const EditPackageBox = React.forwardRef<
  HTMLButtonElement,
  {
    setEditData: React.Dispatch<React.SetStateAction<Package | null>>;
    editData: Package | null;
  }
>(({ setEditData, editData }, ref) => {
  const PackageSchema = z.object({
    name: z.string().min(1, "Name is required"),
    duration: z.number().min(1, "Duration must be at least 1"),
    price: z.number().min(0, "price must be a positive number"),
    description: z.string().min(1, "Description is required"),
    PackageIcon: z.instanceof(File).optional(),
  });

  const [open, setOpen] = useState(false);

  const form = useForm<PackageFormValues>({
    resolver: zodResolver(PackageSchema),
  });

  const { updatePackage, updating, updated } = usePackage();

  type PackageFormValues = z.infer<typeof PackageSchema>;

  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (updated) {
      setOpen(false);
      form.reset();
      setEditData(null);
    }
  }, [updated, form]);

  useEffect(() => {
    if (editData) {
      form.reset({
        name: editData.name,
        duration: editData.duration,
        price: editData.price,
        description: editData.description,
      });
    }
  }, [form, editData]);

  const onSubmit = (values: PackageFormValues) => {
    updatePackage(editData?.id as string, values);
  };

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <Button ref={ref} className="hidden" variant="outline"></Button>
      </AlertDialogTrigger>
      <Form {...form}>
        <AlertDialogContent className="  min-w-[600px] block !p-0">
          <AlertDialogHeader>
            <AlertDialogTitle className=" p-4 border-b-[1.5px] border-b-blue-800">
              Edit Package
            </AlertDialogTitle>
            <AlertDialogDescription
              className=" !text-dark !mt-0 px-4 py-4"
              asChild
            >
              <form
                className=" grid grid-cols-2 gap-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2.5">Package Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Name"
                          className=" !border-[1px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2.5">Duration (days)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                          placeholder="Duration"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className=" col-span-full">
                      <FormLabel className="mb-2.5">Price</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                          type="number"
                          className=" !border-[1px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className=" col-span-full">
                      <FormLabel className="mb-2.5">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={7}
                          {...field}
                          className=" !border-[1px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex col-span-full mt-4 gap-3 items-center justify-end">
                  <AlertDialogCancel
                    ref={closeRef}
                    onClick={() => form.reset()}
                    disabled={updating}
                    type="button"
                  >
                    Cancel
                  </AlertDialogCancel>
                  <Button
                    size={"lg"}
                    className=" !px-8"
                    disabled={updating}
                    type="submit"
                  >
                    Update
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

export default EditPackageBox;
