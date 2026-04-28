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
import useTerms from "../hooks/useTerms";
import { useEffect } from "react";
import RichTextEditor from "@/components/RichTextEditor";
import { useProfile } from "@/features/auth/hooks/useProfile";
import { toast } from "sonner";

const TermsSchema = z.object({
  content: z.string(),
});

type TermsFormValues = z.infer<typeof TermsSchema>;

const AddTermsForm = ({ data }: { data: string | null }) => {
  const { isAuthorized } = useProfile();

  const { updateTerms, updating } = useTerms();

  const form = useForm<TermsFormValues>({
    resolver: zodResolver(TermsSchema),
  });

  const onSubmit = async (data: any) => {
    if (!isAuthorized("Contents", "Update")) {
      toast.error("You are not authorized to update!", {
        position: "top-center",
        className: "!bg-red-400 !text-white",
      });
      return;
    }
    try {
      updateTerms(data);
      form.reset();
    } catch {}
  };

  useEffect(() => {
    if (data) {
      form.setValue("content", data);
    }
  }, [data]);

  return (
    <div className=" bg-white rounded-xl ">
      <div className="px-4 py-5 border-b-2 border-b-blue-600">
        <p className=" text-dark/80 font-semibold text-lg">
          Terms & Conditions
        </p>
      </div>
      <div className="px-4 py-5 ">
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" mb-4">Terms & Conditions</FormLabel>
                  <FormControl>
                    <RichTextEditor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex py-6 gap-3 items-center justify-end">
              <Button
                onClick={() => {
                  form.reset();
                }}
                disabled={updating}
                type="button"
                variant="ghost"
                className="!px-8 h-12"
              >
                Cancel
              </Button>
              <Button className=" h-12 min-w-28 flex items-center justify-between">
                {updating ? "Updating..." : "Update Terms"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddTermsForm;
