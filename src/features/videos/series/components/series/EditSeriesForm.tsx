import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import useSeries from "../../hooks/useSeries";
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
import InformationFormSection from "../edit-form-items/InformationFormSection";
import { useSingleSeriesQuery } from "../../services/seriesService";

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

const UpdateSeriesForm = () => {
  const { id } = useParams();
  const { data, isLoading } = useSingleSeriesQuery({
    id: id as string,
  });

  const nav = useNavigate();
  // const [open, setOpen] = useState(false);
  const { updateSeries, updating, updated, addError } = useSeries();

  const form = useForm<SeriesFormValues>({
    resolver: zodResolver(SeriesSchema),
  });

  // Watch the status field
  const status = form.watch("status");

  // Determine if the Series is scheduled
  const [isScheduled, setIsScheduled] = useState(status === "SCHEDULED");

  useEffect(() => {
    if (status !== "SCHEDULED") setIsScheduled(false);
  }, [status]);

  const onSubmit = (data: any) => {
    updateSeries(id as string, data);
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
      form.setValue("plan", data?.plan);
      form.setValue("status", data?.status);
      form.setValue("tags", data?.tags);
      form.setValue("scriptWriter", data?.scriptWriter);
      form.setValue("category", data?.category?._id);
      form.setValue(
        "genres",
        data?.genres?.map((el: any) => el?._id)
      );
      form.setValue("director", data?.director);
    }
  }, [data, form]);

  return (
    <Form {...form}>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
          <InformationFormSection data={data} form={form} />

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
                {updating ? "Editing..." : "Edit Series"}
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

export default UpdateSeriesForm;
