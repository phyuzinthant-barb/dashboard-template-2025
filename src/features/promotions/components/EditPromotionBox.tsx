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
import usePromotion from "../hooks/usePromotion";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import usePackage from "@/features/packages/hooks/usePackage";

type Promotion = {
  id: string;
  name: string;
  discount: number;
  price: number;
  plan: string;
  startDate: string;
  endDate: string;
};

const EditPromotionBox = React.forwardRef<
  HTMLButtonElement,
  {
    setEditData: React.Dispatch<React.SetStateAction<Promotion | null>>;
    editData: Promotion | null;
  }
>(({ setEditData, editData }, ref) => {
  // const { data: planData } = usePackage();

  const PromotionSchema = z.object({
    name: z
      .string()
      .min(1, "Promotion name is required")
      .max(255, "Promotion name must not exceed 255 characters"),
    // plan: z.string().min(1, "Plan is required"),
    description: z.string().optional(),
    // discount: z
    //   .number()
    //   .min(0, "Discount must be a positive number")
    //   .max(100, "Discount cannot exceed 100%"),
    discount: z.number().min(1, "Duration must be at least 1 day"),
    status: z.boolean().default(true),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  });

  const [open, setOpen] = useState(false);

  const form = useForm<PromotionFormValues>({
    resolver: zodResolver(PromotionSchema),
  });

  const { updatePromotion, updating, updated } = usePromotion();

  type PromotionFormValues = z.infer<typeof PromotionSchema>;

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
        // plan: editData.plan,
        discount: editData.discount,
        startDate: editData.startDate,
        endDate: editData.endDate,
      });
    }
  }, [form, editData]);

  const onSubmit = (values: PromotionFormValues) => {
    updatePromotion(editData?.id as string, values);
  };

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <Button ref={ref} className="hidden" variant="outline"></Button>
      </AlertDialogTrigger>
      <Form {...form}>
        <AlertDialogContent className="  min-w-[700px] block !p-0">
          <AlertDialogHeader>
            <AlertDialogTitle className=" p-4 border-b-[1.5px] border-b-blue-800">
              Edit Promotion
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
                      <FormLabel className="mb-2.5">Promotion Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter promotion name"
                          className=" !border-[1px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <FormField
                  control={form.control}
                  name="plan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plan</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className=" h-11 bg-gray border-[1px]  border-dark/30">
                            <SelectValue placeholder="Select Plan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {planData?.data.map((item: any) => (
                            <SelectItem key={item._id} value={item._id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                {/* <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2.5">Discount (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                          placeholder="Enter discount percentage"
                          className=" !border-[1px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                <FormField
                  control={form.control}
                  name="discount"
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
                          placeholder="Enter duration in days"
                          className=" !border-[1px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* 
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className=" col-span-full">
                      <FormLabel className="mb-2.5">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={5}
                          {...field}
                          placeholder="Enter description"
                          className=" !border-[1px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2.5">Start Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className=" !border-[1px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2.5">End Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
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

export default EditPromotionBox;
