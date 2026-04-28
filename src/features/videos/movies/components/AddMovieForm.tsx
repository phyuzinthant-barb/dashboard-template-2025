import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import useMovie from "../hooks/useMovie";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import InformationFormSection from "./form-items/InformationFormSection";
import CastFormSection from "./form-items/CastFormSection";
import DataFormSection from "./form-items/DataFormSection";
import ScheduleVideo from "./form-items/ScheduleVideo";
import ErrorMessage from "@/components/ErrorMessage";
import { getErrorMessage } from "@/utils/errorHandler";

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
  posterImage: z.instanceof(File),
  bannerImage: z.instanceof(File),
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
  actors: z.array(castSchema).min(1, "At least one actor is required"),
  actresses: z.array(castSchema).min(1, "At least one actress is required"),
  supports: z.array(castSchema.omit({ characterName: true })).optional(),
});

type MovieFormValues = z.infer<typeof movieSchema>;

const AddMovieForm = () => {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const { addMovie, adding, added, addError } = useMovie();

  const form = useForm<MovieFormValues>({
    resolver: zodResolver(movieSchema),
  });

  const status = form.watch("status");

  const [isScheduled, setIsScheduled] = useState(status === "SCHEDULED");

  useEffect(() => {
    if (status !== "SCHEDULED") setIsScheduled(false);
  }, [status]);

  const onSubmit = (data: any) => {
    const formData = { ...data };

    if (formData.plan !== "PAY_PER_VIEW") {
      delete formData.payPerViewPrice;
    }

    if (formData.status !== "SCHEDULED") {
      delete formData.scheduleAt;
    }

    addMovie(formData);
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
        <CastFormSection form={form} />
        <DataFormSection form={form} />

        {addError &&
          (addError as ApiError).data?.details?.map((el: string) => (
            <ErrorMessage key={el} message={el} />
          ))}

        {addError && <ErrorMessage message={getErrorMessage(addError)} />}

        {!isScheduled && (
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

            <DropdownMenu open={open} onOpenChange={() => setOpen(!open)}>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  className=" h-12 min-w-28 flex items-center justify-between"
                >
                  {adding ? "Adding..." : "Add Movie"}
                  <ChevronDown className=" size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 space-y-1 me-1">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => {
                      form.setValue("status", "PUBLISHED");
                      form.handleSubmit(onSubmit)();
                    }}
                    className="my-1.5"
                    disabled={adding}
                  >
                    Add Now
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setIsScheduled(true);
                      form.setValue("status", "SCHEDULED");
                      setOpen(false);
                    }}
                    disabled={adding}
                    className=" my-1.5"
                  >
                    Scheduled for later
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {isScheduled && <ScheduleVideo form={form} adding={adding} />}
      </form>
    </Form>
  );
};

export default AddMovieForm;
