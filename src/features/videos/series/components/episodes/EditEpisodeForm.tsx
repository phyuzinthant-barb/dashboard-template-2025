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
import { useEffect } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import { getErrorMessage } from "@/utils/errorHandler";
import useEpisodes from "../../hooks/useEpisode";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSingleEpisodeQuery } from "../../services/episodeService";
import UpdateScheduleVideo from "@/components/UpdateScheduleVideo";

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
  plan: z.enum(["FREE", "PAID"]),
  trailerUrl: z.string().optional(),
  videoUrl: z.string().url("Invalid URL format for video"),
  duration: z.number().int().positive("Duration must be a positive integer"),
  season: z.string().optional(),
  scheduleAt: z.string().optional(),
});

type EpisodesFormValues = z.infer<typeof EpisodesSchema>;

const EditEpisodesForm = () => {
  const { id } = useParams();

  const nav = useNavigate();

  const { updateEpisodes, updating, updated, updateError } = useEpisodes();

  const { data } = useSingleEpisodeQuery({
    id: id as string,
  });

  const form = useForm<EpisodesFormValues>({
    resolver: zodResolver(EpisodesSchema),
  });

  const onSubmit = (data: any) => {
    updateEpisodes(id as string, data);
  };

  useEffect(() => {
    if (updated) {
      form.reset();
      nav(-1);
    }
  }, [form, updated]);

  useEffect(() => {
    form.setValue("season", data?.season as string);
  }, [id, form]);

  useEffect(() => {
    if (form) {
      form.reset({
        name: data?.name || "",
        sortOrder: data?.sortOrder || 0,
        description: data?.description || "",
        plan: data?.plan || "FREE",
        trailerUrl: data?.trailerUrl || "",
        videoUrl: data?.videoUrl || "",
        duration: data?.duration || 0,
      });
      if (data?.status == "SCHEDULED") {
        form.setValue("scheduleAt", data?.scheduleAt);
      }
    }
  }, [data, form]);

  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <section className=" bg-white  rounded-xl">
          <div className="p-4 text-xl border-b-[1.5px] font-bold border-b-blue-800">
            Edit Episode
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
                        placeholder="Enter sort order"
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
                          <SelectValue placeholder={data?.plan} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {["FREE", "PAID"]?.map((item: any) => (
                          <SelectItem
                            className=" capitalize"
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

        {updateError &&
          (updateError as ApiError).data?.details?.map((el: string) => (
            <ErrorMessage key={el} message={el} />
          ))}

        {updateError && <ErrorMessage message={getErrorMessage(updateError)} />}

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
              onClick={() => {
                form.handleSubmit(onSubmit)();
              }}
              className=" h-12 min-w-28 flex items-center justify-between"
            >
              {updating ? "Editing..." : "Edit Episode"}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default EditEpisodesForm;
