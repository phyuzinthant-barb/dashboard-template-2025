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
import useFAQ from "../hooks/useFAQ";
import { TextArea } from "@/components/ui/textfield";

// Forward ref to the AddFAQBox component
const AddFAQBox = React.forwardRef<HTMLButtonElement>((_, ref) => {
  const FAQSchema = z.object({
    question: z.string().min(1, "Name is required"),
    answer: z.string().min(1, "Name is required"),
  });

  const [open, setOpen] = useState(false);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(FAQSchema),
  });

  const { addFAQ, adding, added } = useFAQ();

  type CategoryFormValues = z.infer<typeof FAQSchema>;

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
              Add New FAQ
            </AlertDialogTitle>
            <AlertDialogDescription
              className=" !text-dark !mt-0 px-4 py-4"
              asChild
            >
              <form className=" space-y-4" onSubmit={form.handleSubmit(addFAQ)}>
                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2.5">Question</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter Question"
                          className=" !border-[1px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="answer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2.5">Answer</FormLabel>
                      <FormControl>
                        <TextArea
                          rows={6}
                          {...field}
                          placeholder="Enter Answer"
                          className=" !border-[1px]"
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

export default AddFAQBox;
