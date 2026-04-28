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
import usePackage from "@/features/packages/hooks/usePackage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const AddPromotionBox = React.forwardRef<HTMLButtonElement>((_, ref) => {
  const PromotionSchema = z.object({
    name: z
      .string()
      .min(1, "Promotion name is required")
      .max(255, "Promotion name must not exceed 255 characters"),
    plan: z.string().min(1, "Plan is required"),
    description: z.string().optional(),
    type: z.enum(["DAYS", "DISCOUNT_FLAT", "DISCOUNT_PERCENT"]),

    discount: z.number().min(1, "Duration must be at least 1 day"),
    status: z.boolean().default(true),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  });

  const { data: planData } = usePackage();

  type PromotionFormValues = z.infer<typeof PromotionSchema>;

  const [open, setOpen] = useState(false);

  const form = useForm<PromotionFormValues>({
    resolver: zodResolver(PromotionSchema),
  });

  const { addPromotion, adding, added } = usePromotion();

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
        <AlertDialogContent className="  min-w-[700px] block !p-0">
          <AlertDialogHeader>
            <AlertDialogTitle className=" p-4 border-b-[1.5px] border-b-blue-800">
              Add New Promotion
            </AlertDialogTitle>
            <AlertDialogDescription
              className=" !text-dark !mt-0 px-4 py-4"
              asChild
            >
              <form
                className=" grid grid-cols-2 gap-4"
                onSubmit={form.handleSubmit(addPromotion)}
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

                <FormField
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
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2.5">Promotion Type</FormLabel>
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
                          {[
                            { name: "Days", value: "DAYS" },
                            {
                              name: "Discount",
                              value: "DISCOUNT_PERCENT",
                            },
                          ].map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2.5">
                        {form.watch("type") === "DAYS"
                          ? "Duration (Days)"
                          : "Discount"}
                      </FormLabel>
                      <FormControl>
                        {form.watch("type") === "DAYS" ? (
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                            placeholder="Enter duration in days"
                            className=" !border-[1px]"
                          />
                        ) : (
                          <div className="flex w-full">
                            <Input
                              type="number"
                              className="h-10 border-[0.5px] bg-secondary w-full border-dark-blue/30 text-dark-blue"
                              placeholder="Enter Value"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button className="rounded-l-none w-[90px] text-xs uppercase h-10 -ms-2">
                                  {form.watch("type") === "DISCOUNT_FLAT"
                                    ? "Flat"
                                    : "Percent"}
                                  <span>
                                    <ChevronDown className=" size-4" />
                                  </span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className=" space-y-1 me-1">
                                <DropdownMenuGroup>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      form.setValue("type", "DISCOUNT_FLAT");
                                    }}
                                  >
                                    Flat
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      form.setValue("type", "DISCOUNT_PERCENT");
                                    }}
                                  >
                                    Percentage
                                  </DropdownMenuItem>
                                </DropdownMenuGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

export default AddPromotionBox;
