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
import useAds from "../hooks/useAds";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useMovie from "@/features/videos/movies/hooks/useMovie";
import { Input } from "@/components/ui/input";
import useSeries from "@/features/videos/series/hooks/useSeries";

const AdsSchema = z.object({
  promotionUrl: z.string().optional(),
  reference: z.string().optional(),
  type: z.enum(["MOVIE", "SERIES", "PROMOTION"]).optional(),
  image: z.instanceof(File),
});

type AdsFormValues = z.infer<typeof AdsSchema>;

const AddAdsForm = () => {
  const { addAds, adding } = useAds();
  const { data: movieData } = useMovie();
  const { data: seriesData } = useSeries();

  const form = useForm<AdsFormValues>({
    resolver: zodResolver(AdsSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      addAds(data);
      form.reset();
    } catch {}
  };

  const type = form.watch("type");

  return (
    <div className=" bg-white rounded-xl ">
      <div className="px-4 py-5 border-b-2 border-b-blue-600">
        <p className=" text-dark/80 font-semibold text-lg">Add Ads</p>
      </div>
      <div className="px-4 py-5 ">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className=" grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Media Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className=" h-11 bg-gray border-[1px]  border-dark/30">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {["MOVIE", "SERIES", "PROMOTION"].map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {type == "MOVIE" && (
                <FormField
                  control={form.control}
                  name="reference"
                  render={({ field }) => (
                    <FormItem className=" ">
                      <FormLabel>Movie Name</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className=" h-11 bg-gray border-[1px]  border-dark/30">
                            <SelectValue placeholder="Select Movie" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {movieData?.data.map((item: any) => (
                            <SelectItem key={item._id} value={item._id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {type == "SERIES" && (
                <FormField
                  control={form.control}
                  name="reference"
                  render={({ field }) => (
                    <FormItem className=" ">
                      <FormLabel>Series Name</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className=" h-11 bg-gray border-[1px]  border-dark/30">
                            <SelectValue placeholder="Select Series" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {seriesData?.data.map((item: any) => (
                            <SelectItem key={item._id} value={item._id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {type == "PROMOTION" && (
                <FormField
                  control={form.control}
                  name="promotionUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" mb-4">Promotion Link</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className=" col-span-full">
                    <FormLabel className=" mb-4">Upload Ads</FormLabel>
                    <FormControl>
                      <FileUpload
                        sizeLabel="358 * 553"
                        accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex py-6 gap-3 items-center justify-end">
              <Button
                onClick={() => {
                  form.reset();
                }}
                disabled={adding}
                type="button"
                variant="ghost"
                className="!px-8 h-12"
              >
                Cancel
              </Button>
              <Button className=" h-12  flex items-center justify-between">
                {adding ? "Adding..." : "Add Ads"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddAdsForm;
