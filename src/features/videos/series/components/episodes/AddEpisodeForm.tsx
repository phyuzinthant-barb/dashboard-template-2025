import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import { getErrorMessage } from "@/utils/errorHandler";
import useEpisodes from "../../hooks/useEpisode";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import ScheduleVideo from "@/features/videos/movies/components/form-items/ScheduleVideo";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ApiError = {
  data: {
    details?: string[];
  };
  status: number;
};

const EpisodesSchema = z.object({
  name: z.string().min(1, "Name is required"),
  sortOrder: z
    .number()
    .int()
    .nonnegative("Sort order must be a non-negative integer"),
  description: z.string().optional(),
  status: z.enum(["PUBLISHED", "UNPUBLISHED", "SCHEDULED"]),
  plan: z.enum(["FREE", "PAID"]),
  trailerUrl: z.string().optional(),
  videoUrl: z.string().url("Invalid URL format for video"),
  duration: z.number().int().positive("Duration must be a positive integer"),
  season: z.string().min(1, "Season is required"),
  scheduleAt: z.string().min(1, "Season is required").optional(),
});

type EpisodesFormValues = z.infer<typeof EpisodesSchema>;

const AddEpisodesForm = () => {
  const { id } = useParams();

  const nav = useNavigate();
  const { addEpisodes, adding, added, addError } = useEpisodes();

  const form = useForm<EpisodesFormValues>({
    resolver: zodResolver(EpisodesSchema),
  });

  useEffect(() => {
    if (added) {
      form.reset();
      nav(-1);
    }
  }, [form, added]);

  const status = form.watch("status");
  const [open, setOpen] = useState(false);
  const [isScheduled, setIsScheduled] = useState(status === "SCHEDULED");

  useEffect(() => {
    form.setValue("season", id as string);
  }, [id, form]);

  const onSubmit = (data: any) => {
    const formData = { ...data };

    if (formData.status !== "SCHEDULED") {
      delete formData.scheduleAt;
    }

    addEpisodes(formData);
  };

  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <section className=" bg-white  rounded-xl">
          <div className="p-4 text-xl border-b-[1.5px] font-bold border-b-blue-800">
            Add New Episode
          </div>
          <div className="!text-dark !mt-0 px-4 py-4">
            <div className="grid grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-2.5">Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="!border-[1px]"
                        placeholder="Enter episode name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sortOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-2.5">Episode Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                        type="number"
                        min={1}
                        className="!border-[1px]"
                        placeholder="Enter episode number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-2.5">Duration</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                        className="!border-[1px]"
                        placeholder="Enter duration in minutes"
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
                  <FormItem className=" ">
                    <FormLabel>Plan</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className=" h-11 bg-gray border-[1.5px] border-dark/30">
                          <SelectValue placeholder="Select Plan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {["FREE", "PAID"]?.map((item: any) => (
                          <SelectItem
                            className="  capitalize"
                            key={item}
                            value={item}
                          >
                            {item}
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
                name="trailerUrl"
                render={({ field }) => (
                  <FormItem className=" col-span-full">
                    <FormLabel className="mb-2.5">Trailer URL</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="!border-[1px]"
                        placeholder="Enter trailer URL"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem className=" col-span-full">
                    <FormLabel className="mb-2.5">Video URL</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="!border-[1px]"
                        placeholder="Enter video URL"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className=" col-span-full">
                    <FormLabel className="mb-2.5">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={7}
                        {...field}
                        className="!border-[1px] bg-gray"
                        placeholder="Enter episode description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </section>

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
                  {adding ? "Adding..." : "Add Episode"}
                  <ChevronDown className=" size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 space-y-1 me-1">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => {
                      form.setValue("status", "PUBLISHED");
                      onSubmit(form.getValues());
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

export default AddEpisodesForm;
