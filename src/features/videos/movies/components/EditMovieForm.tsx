import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import useMovie from "../hooks/useMovie";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import InformationFormSection from "./edit-form-items/InformationFormSection";
import CastFormSection from "./edit-form-items/CastFormSection";
import DataFormSection from "./edit-form-items/DataFormSection";
import { useSingleMovieQuery } from "../services/movieService";
import UpdateScheduleVideo from "@/components/UpdateScheduleVideo";

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

const movieSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  plan: z.enum(["FREE", "PAID", "PAY_PER_VIEW"]),
  status: z.enum(["PUBLISHED", "UNPUBLISHED", "SCHEDULED"]),
  scheduleAt: z.string().optional(),
  posterImage: z.instanceof(File).optional(),
  bannerImage: z.instanceof(File).optional(),
  videoUrl: z
    .string()
    .url("Invalid URL format")
    .min(1, "Video URL is required"),
  trailerUrl: z
    .string()
    .url("Invalid URL format")
    .min(1, "Video URL is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  scriptWriter: z.string().min(1, "At least one script writer is required"),
  category: z.string().min(1, "Category is required"),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
  payPerViewPrice: z
    .number()
    .min(1, "Price must be more than 1000 kyats!")
    .optional(),
  genres: z.array(z.string()).min(1, "At least one genre is required"),
  director: z.string().min(1, "At least one director is required"),
  actors: z.array(castSchema),
  actresses: z.array(castSchema),
  supports: z.array(castSchema.omit({ characterName: true })).optional(),
});

type MovieFormValues = z.infer<typeof movieSchema>;

const UpdateMovieForm = () => {
  const { id } = useParams();

  const { data, isLoading } = useSingleMovieQuery({
    id: id as string,
  });

  const nav = useNavigate();
  // const [open, setOpen] = useState(false);
  const { updateMovie, updating, updated, updateError } = useMovie();

  const form = useForm<MovieFormValues>({
    resolver: zodResolver(movieSchema),
  });

  // Determine if the movie is scheduled

  const onSubmit = (data: any) => {
    updateMovie(id as string, data);
  };

  useEffect(() => {
    if (updated) {
      form.reset();
      nav(-1);
    }
  }, [form, updated]);

  useEffect(() => {
    if (data) {
      form.setValue("name", data?.name);
      form.setValue("category", data?.category?._id);
      form.setValue(
        "genres",
        data?.genres?.map((el: any) => el?._id)
      );
      form.setValue("plan", data?.plan);
      form.setValue("duration", data?.duration);
      if (data?.payPerViewPrice) {
        form.setValue("payPerViewPrice", data?.payPerViewPrice);
      }
      form.setValue("tags", data?.tags);
      form.setValue("scriptWriter", data?.scriptWriter);
      form.setValue("director", data?.director);
      form.setValue("status", data?.status);
      if (data?.status == "SCHEDULED") {
        form.setValue("scheduleAt", data?.scheduleAt);
      }
    }
  }, [data, form]);

  return (
    <Form {...form}>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
          <InformationFormSection data={data} form={form} />
          <CastFormSection form={form} data={data} />
          <DataFormSection form={form} data={data} />

          {/* Submit buttons */}

          {updateError &&
            (updateError as ApiError).data?.details?.map((el: string) => (
              <ErrorMessage key={el} message={el} />
            ))}

          {data?.status === "SCHEDULED" && (
            <UpdateScheduleVideo form={form} adding={updating} />
          )}

          {data?.status !== "SCHEDULED" && (
            <div className="flex py-6 gap-3 items-center justify-end">
              <Button
                onClick={() => {
                  form.reset();
                  nav(-1);
                }}
                disabled={updating}
                type="button"
                variant="ghost"
                className="!px-8 h-12"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => onSubmit(form.getValues())}
                className=" h-12 min-w-28 flex items-center justify-between"
              >
                {updating ? "Editing..." : "Edit Movie"}
              </Button>
            </div>
          )}
        </form>
      )}
    </Form>
  );
};

export default UpdateMovieForm;
