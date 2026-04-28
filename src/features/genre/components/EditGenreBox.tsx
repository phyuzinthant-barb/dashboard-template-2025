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
import useGenre from "../hooks/useGenre";
import { FileUpload } from "@/components/FileUpload";

// Forward ref to the EditGenreBox component
const EditGenreBox = React.forwardRef<
  HTMLButtonElement,
  {
    setEditData: React.Dispatch<
      React.SetStateAction<{
        id: "";
        name: "";
        genreIcon: "";
      }>
    >;
    editData: {
      id: "";
      name: "";
      genreIcon: "";
    };
  }
>(({ setEditData, editData }, ref) => {
  const genreSchema = z.object({
    name: z.string().min(1, "Name is required"),
    genreIcon: z.instanceof(File).optional(),
  });

  const [open, setOpen] = useState(false);

  const form = useForm<GenreFormValues>({
    resolver: zodResolver(genreSchema),
  });

  const { updateGenre, updating, updated } = useGenre();

  type GenreFormValues = z.infer<typeof genreSchema>;

  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (updated) {
      setOpen(false);
      form.reset();
      setEditData({ id: "", name: "", genreIcon: "" });
    }
  }, [updated, form]);

  useEffect(() => {
    if (editData.name) {
      form.setValue("name", editData.name);
    }
  }, [editData.name, form]);

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <Button ref={ref} className="hidden" variant="outline"></Button>
      </AlertDialogTrigger>
      <Form {...form}>
        <AlertDialogContent className="  min-w-[600px] block !p-0">
          <AlertDialogHeader>
            <AlertDialogTitle className=" p-4 border-b-[1.5px] border-b-blue-800">
              Edit Genre
            </AlertDialogTitle>
            <AlertDialogDescription
              className=" !text-dark !mt-0 px-4 py-4"
              asChild
            >
              <form
                className=" space-y-4"
                onSubmit={form.handleSubmit((data) =>
                  updateGenre(editData?.id as string, data)
                )}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2.5">Genre Name</FormLabel>
                      <FormControl>
                        <Input {...field} className=" !border-[1px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="genreIcon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2.5">
                        Change Icon Photo (PNG or JPG)
                      </FormLabel>
                      <FormControl>
                        <FileUpload
                          sizeLabel="80 * 80"
                          accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
                          className=" w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex mt-4 gap-3 items-center justify-end">
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

export default EditGenreBox;
