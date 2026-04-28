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
import useSeries from "../../hooks/useSeries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface SeriesData {
  id: string;
  plan: string;
}

const EditPlanBox = React.forwardRef<
  HTMLButtonElement,
  {
    setEditData: React.Dispatch<React.SetStateAction<SeriesData | null>>;
    editData: SeriesData | null;
  }
>(({ setEditData, editData }, ref) => {
  const SeriesSchema = z.object({
    plan: z.string().min(1, "Plan is required"),
    payPerViewPrice: z
      .number()
      .min(1, "Price must be more than 1000 kyats!")
      .optional(),
  });

  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof SeriesSchema>>({
    resolver: zodResolver(SeriesSchema),
  });

  const closeRef = useRef<HTMLButtonElement | null>(null);

  const { updateSeries, updating, updated } = useSeries();

  useEffect(() => {
    if (updated) {
      setOpen(false);
      form.reset();
    }
  }, [updated, form]);

  useEffect(() => {
    if (editData) {
      form.reset({
        plan: editData?.plan,
      });
      setOpen(true);
    }
  }, [editData, form]);

  const onSubmit = async (values: z.infer<typeof SeriesSchema>) => {
    if (!editData?.id) return;
    await updateSeries(editData.id, values);
  };

  useEffect(() => {
    if (!open) {
      setEditData(null);
      form.reset();
    }
  }, [open, form, setEditData]);

  const plan = form.watch("plan");

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <Button ref={ref} className="hidden" variant="outline"></Button>
      </AlertDialogTrigger>

      <Form {...form}>
        <AlertDialogContent className="min-w-[600px] block !p-0">
          <AlertDialogHeader>
            <AlertDialogTitle className="p-4 border-b-[1.5px] border-b-blue-800">
              Change Plan
            </AlertDialogTitle>
            <AlertDialogDescription
              className="!text-dark !mt-0 px-4 py-4"
              asChild
            >
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="plan"
                  render={({ field }) => (
                    <FormItem className=" ">
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className=" h-11 bg-gray border-[1.5px] border-dark/30">
                            <SelectValue placeholder={editData?.plan} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {["FREE", "PAID", "PAY_PER_VIEW"]?.map(
                            (item: any) => (
                              <SelectItem
                                className="capitalize"
                                key={item}
                                value={item}
                              >
                                {item}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {plan == "PAY_PER_VIEW" && (
                  <FormField
                    control={form.control}
                    name="payPerViewPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                            placeholder="Price"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
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
                    className="!px-8"
                    disabled={updating}
                    type="submit"
                  >
                    {updating ? "Updating..." : "Update"}
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

EditPlanBox.displayName = "EditPlanBox";

export default EditPlanBox;
