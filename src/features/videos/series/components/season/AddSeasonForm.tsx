import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import { getErrorMessage } from "@/utils/errorHandler";
import SeasonInformationFormSection from "../form-items/SeasonInformationFormSection";
import CastFormSection from "../../../movies/components/form-items/CastFormSection";
import useSeason from "../../hooks/useSeason";

type ApiError = {
  data: {
    details?: string[];
  };
  status: number;
};

const castSchema = z.object({
  cast: z.string(),
  sortOrder: z.number(),
  characterName: z.string().optional(),
});

const SeasonSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  trailerUrl: z.string().min(1, "Description is required"),
  status: z.enum(["PUBLISHED", "UNPUBLISHED", "SCHEDULED"]),
  bannerImage: z.instanceof(File).optional(),
  series: z.string().min(1, "Category is required"),
  actors: z.array(castSchema),
  actresses: z.array(castSchema),
  supports: z.array(castSchema.omit({ characterName: true })).optional(),
});

type SeasonFormValues = z.infer<typeof SeasonSchema>;

const AddSeasonForm = () => {
  const { id } = useParams();

  const nav = useNavigate();
  const { addSeason, adding, added, addError } = useSeason();

  const form = useForm<SeasonFormValues>({
    resolver: zodResolver(SeasonSchema),
    defaultValues: {
      status: "PUBLISHED",
    },
  });

  const onSubmit = (data: any) => {
    addSeason(data);
  };

  useEffect(() => {
    if (added) {
      form.reset();
      nav(-1);
    }
  }, [form, added]);

  useEffect(() => {
    form.setValue("series", id as string);
  }, [id, form]);

  console.log(form.getValues("supports"));

  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <SeasonInformationFormSection form={form} />
        <CastFormSection form={form} />

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
            {adding ? "Adding..." : "Add Season"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddSeasonForm;
