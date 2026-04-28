import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import useSeason from "../../hooks/useSeason";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import SeasonInformationFormSection from "../edit-form-items/SeasonInformationFormSection";
import { useSingleSeasonQuery } from "../../services/seasonService";
import CastFormSection from "@/features/videos/movies/components/edit-form-items/CastFormSection";

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
  Season: z.string().min(1, "Category is required"),
  actors: z.array(castSchema),
  actresses: z.array(castSchema),
  supports: z.array(castSchema.omit({ characterName: true })),
});

type SeasonFormValues = z.infer<typeof SeasonSchema>;

const EditSeasonForm = () => {
  const { id } = useParams();
  const { data, isLoading } = useSingleSeasonQuery({
    id: id as string,
  });

  const nav = useNavigate();
  // const [open, setOpen] = useState(false);
  const { updateSeason, updating, updated, addError } = useSeason();

  const form = useForm<SeasonFormValues>({
    resolver: zodResolver(SeasonSchema),
  });

  // Watch the status field
  const status = form.watch("status");

  // Determine if the Season is scheduled
  const [isScheduled, setIsScheduled] = useState(status === "SCHEDULED");

  useEffect(() => {
    if (status !== "SCHEDULED") setIsScheduled(false);
  }, [status]);

  const onSubmit = (data: any) => {
    updateSeason(id as string, data);
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
      form.setValue("description", data?.description);
      form.setValue("trailerUrl", data?.trailerUrl);
      form.setValue("status", data?.status);
      form.setValue("actors", data?.actors || []);
      form.setValue("actresses", data?.actresses || []);
      form.setValue("supports", data?.supports || []);
    }
  }, [data, form]);

  return (
    <Form {...form}>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
          <SeasonInformationFormSection data={data} form={form} />
          <CastFormSection data={data} form={form} />

          {/* Submit buttons */}

          {addError &&
            (addError as ApiError).data?.details?.map((el: string) => (
              <ErrorMessage key={el} message={el} />
            ))}

          {!isScheduled && (
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
                {updating ? "Editing..." : "Edit Season"}
              </Button>

              {/* <DropdownMenu open={open} onOpenChange={() => setOpen(!open)}>
              <DropdownMenuTrigger asChild>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 space-y-1 me-1">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => onSubmit(form.getValues())}
                    className="my-1.5"
                    disabled={updating}
                  >
                    Update
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setIsScheduled(true);
                      form.setValue("status", "SCHEDULED");
                      setOpen(false);
                    }}
                    disabled={updating}
                    className=" my-1.5"
                  >
                    Scheduled for later
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu> */}
            </div>
          )}

          {/* {isScheduled && <ScheduleVideo form={form} updating={updating} />} */}
        </form>
      )}
    </Form>
  );
};

export default EditSeasonForm;
