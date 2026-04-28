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
import useBanner from "../hooks/useBanner";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const bannerSchema = z.object({
  image: z.instanceof(File),
});

type BannerFormValues = z.infer<typeof bannerSchema>;

const AddBannerForm = () => {
  const { addBanner, adding, data } = useBanner();

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(bannerSchema),
  });

  const nav = useNavigate();

  const onSubmit = async (values: any) => {
    if (data?.count === 6) {
      toast.error("You can only add 6 banners", {
        position: "top-center",
      });
      form.reset();
      return;
    } else {
      try {
        await addBanner(values);
        form.reset();
        nav(-1);
      } catch {}
    }
  };

  return (
    <div className=" bg-white rounded-xl ">
      <div className="px-4 py-5 border-b-2 border-b-blue-600">
        <p className=" text-dark/80 font-semibold text-lg">Add Banner</p>
      </div>
      <div className="px-4 py-5 ">
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" mb-4 flex justify-between items-center">
                    <span>Upload Banner</span>
                    <span>({data?.count}/6)</span>
                  </FormLabel>
                  <FormControl>
                    <FileUpload
                      sizeLabel="390 * 240"
                      accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                {adding ? "Adding..." : "Add Banner"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddBannerForm;
