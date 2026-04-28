import { FileUpload } from "@/components/FileUpload";
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
import { Input } from "@/components/ui/input";
import useAnnouncement from "../hooks/useAnnouncement";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import UpdateScheduleVideo from "@/components/UpdateScheduleVideo";
import { useSingleAnnouncementQuery } from "../services/announcementService";

const AnnouncementSchema = z.object({
  title: z.string().min(1, "This field cannot be empty!"),
  body: z.string().min(1, "This field cannot be empty!"),
  status: z.enum(["PUBLISHED", "UNPUBLISHED", "SCHEDULED"]).optional(),
  image: z.instanceof(File).optional(),
  scheduleAt: z.string().optional(),
});

type AnnouncementFormValues = z.infer<typeof AnnouncementSchema>;

const EditAnnouncementForm = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const { data } = useSingleAnnouncementQuery({
    id: id as string,
  });

  const { updateAnnouncement, updating, updated } = useAnnouncement();
  const [open, setOpen] = useState(false);

  // Edit series here
  const form = useForm<AnnouncementFormValues>({
    resolver: zodResolver(AnnouncementSchema),
  });

  const status = form.watch("status");

  // Determine if the Announcement is scheduled
  const [isScheduled, setIsScheduled] = useState(status === "SCHEDULED");

  useEffect(() => {
    if (status !== "SCHEDULED") setIsScheduled(false);
  }, [status]);

  const onSubmit = async (data: any) => {
    try {
      await updateAnnouncement(id as string, data);
    } catch {}
  };

  useEffect(() => {
    if (updated) {
      form.reset();
      nav(-1);
    }
  }, [updated]);

  useEffect(() => {
    if (data) {
      form.setValue("title", data?.title);
      form.setValue("body", data?.body);
      form.setValue("status", data?.status);
    }
  }, [data]);

  return (
    <div className=" bg-white rounded-xl ">
      <div className="px-4 py-5 border-b-2 border-b-blue-600">
        <p className=" text-dark/80 font-semibold text-lg">Edit Announcement</p>
      </div>

      <div className="px-4 py-5 ">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className=" grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" mb-4">Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" mb-4">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={6}
                        placeholder="Write a description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className=" col-span-full">
                    <FormLabel className=" mb-4">Upload Image</FormLabel>
                    <FormControl>
                      <FileUpload
                        sizeLabel="80 * 80"
                        accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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

                <DropdownMenu open={open} onOpenChange={() => setOpen(!open)}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      className=" h-12 min-w-28 flex items-center justify-between"
                    >
                      {updating ? "updating..." : "Update Announcement"}
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
                        disabled={updating}
                      >
                        Edit Announcement
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
                </DropdownMenu>
              </div>
            )}

            {isScheduled && (
              <UpdateScheduleVideo form={form} updating={updating} />
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditAnnouncementForm;
