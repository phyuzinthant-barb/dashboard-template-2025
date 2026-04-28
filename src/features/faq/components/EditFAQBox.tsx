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
import { Textarea } from "@/components/ui/textarea";

// Forward ref to the EditFAQBox component
const EditFAQBox = React.forwardRef<
  HTMLButtonElement,
  {
    setEditData: React.Dispatch<
      React.SetStateAction<{
        id: "";
        question: "";
        answer: "";
      }>
    >;
    editData: {
      id: "";
      question: "";
      answer: "";
    };
  }
>(({ setEditData, editData }, ref) => {
  const FAQSchema = z.object({
    question: z.string().min(1, "This field is required"),
    answer: z.string().min(1, "This field is required"),
  });

  const [open, setOpen] = useState(false);

  const form = useForm<FAQFormValues>({
    resolver: zodResolver(FAQSchema),
  });

  const { updateFAQ, updating, updated } = useFAQ();

  type FAQFormValues = z.infer<typeof FAQSchema>;

  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (updated) {
      setOpen(false);
      form.reset();
      setEditData({ id: "", question: "", answer: "" });
    }
  }, [updated, form]);

  useEffect(() => {
    if (editData.question) {
      form.setValue("question", editData.question);
      form.setValue("answer", editData.answer);
    }
  }, [editData, form]);

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <Button ref={ref} className="hidden" variant="outline"></Button>
      </AlertDialogTrigger>
      <Form {...form}>
        <AlertDialogContent className="  min-w-[600px] block !p-0">
          <AlertDialogHeader>
            <AlertDialogTitle className=" p-4 border-b-[1.5px] border-b-blue-800">
              Edit FAQ
            </AlertDialogTitle>
            <AlertDialogDescription
              className=" !text-dark !mt-0 px-4 py-4"
              asChild
            >
              <form
                className=" space-y-4"
                onSubmit={form.handleSubmit((data) =>
                  updateFAQ(editData?.id as string, data)
                )}
              >
                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2.5">Question</FormLabel>
                      <FormControl>
                        <Input {...field} className=" !border-[1px]" />
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
                        <Textarea
                          rows={6}
                          {...field}
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

export default EditFAQBox;
