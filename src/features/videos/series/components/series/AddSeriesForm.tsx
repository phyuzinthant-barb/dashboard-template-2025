import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import useSeries from "../../hooks/useSeries";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import { getErrorMessage } from "@/utils/errorHandler";
import InformationFormSection from "../form-items/SeriesInformationFormSection";

type ApiError = {
  data: {
    details?: string[];
  };
  status: number;
};

const SeriesSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  plan: z.enum(["FREE", "PAID"]),
  status: z.enum(["PUBLISHED", "UNPUBLISHED", "SCHEDULED"]),
  posterImage: z.instanceof(File).optional(),
  bannerImage: z.instanceof(File).optional(),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  scriptWriter: z.string().min(1, "At least one script writer is required"),
  category: z.string().min(1, "Category is required"),
  genres: z.array(z.string()).min(1, "At least one genre is required"),
  director: z.string().min(1, "At least one director is required"),
});

type SeriesFormValues = z.infer<typeof SeriesSchema>;

const AddSeriesForm = () => {
  const nav = useNavigate();
  const { addSeries, adding, added, addError } = useSeries();

  const form = useForm<SeriesFormValues>({
    resolver: zodResolver(SeriesSchema),
    defaultValues: {
      status: "PUBLISHED",
    },
  });

  const onSubmit = (data: any) => {
    const formData = { ...data };

    if (formData.status !== "SCHEDULED") {
      delete formData.scheduleAt;
    }

    addSeries(formData);
  };

  useEffect(() => {
    if (added) {
      form.reset();
      nav(-1);
    }
  }, [form, added]);

  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <InformationFormSection form={form} />

        {/* Submit buttons */}

        {addError &&
          (addError as ApiError).data?.details?.map((el: string) => (
            <ErrorMessage key={el} message={el} />
          ))}

        {addError && <ErrorMessage message={getErrorMessage(addError)} />}

        <div className="flex py-6 gap-3 items-center justify-end">
          <Button
            onClick={() => {
              form.reset();
              nav(-1);
            }}
            disabled={adding}
            type="button"
            variant="ghost"
            className="!px-8 h-12"
          >
            Cancel
          </Button>

          <Button className=" h-12 min-w-28 flex items-center justify-between">
            {adding ? "Adding..." : "Add Series"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddSeriesForm;
