import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import useReminder from "../hooks/useReminder";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

const ReminderSchema = z.object({
  days: z.string().min(1, "Please Don't "),
});

type ReminderFormValues = z.infer<typeof ReminderSchema>;

const EditReminderForm = () => {
  const { updateReminder, updating, data } = useReminder();

  const form = useForm<ReminderFormValues>({
    resolver: zodResolver(ReminderSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      updateReminder({
        ...data,
        days: data?.days,
      });
      form.reset();
    } catch {}
  };

  useEffect(() => {
    if (data) form.setValue("days", data?.metadata?.reminderDay?.days);
  }, [data, form]);

  return (
    <div className=" bg-white w-1/2 rounded-xl">
      <div className="px-4 py-5 border-b-2 border-b-blue-600">
        <p className=" text-dark/80 font-semibold text-lg">Edit Reminder</p>
      </div>

      <div className="px-4 py-5">
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="days"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" mb-4">Days</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex py-6 gap-3 items-center justify-end">
              <Button className=" h-12 flex items-center justify-between">
                {updating ? "Updating..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditReminderForm;
