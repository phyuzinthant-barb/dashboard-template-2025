import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/FileUpload";
import { Textarea } from "@/components/ui/textarea";

const SeasonInformationFormSection = ({ form }: any) => {
  return (
    <section className=" bg-white rounded-xl">
      <div className="p-4 text-xl border-b-[1.5px] font-bold border-b-blue-800">
        Edit Season
      </div>
      <div className="!text-dark !mt-0 px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="bannerImage"
            render={({ field }) => (
              <FormItem className=" col-span-full">
                <FormLabel>Upload Banner Photo (PNG or JPG)</FormLabel>
                <FormControl>
                  <FileUpload
                    sizeLabel="390 * 200"
                    accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className=" col-span-full">
                <FormLabel>Season Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Series Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="trailerUrl"
            render={({ field }) => (
              <FormItem className=" col-span-full">
                <FormLabel>Trailer Url</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Trailer Url" />
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className=" border-[1.5px] border-dark/30"
                    placeholder="Description"
                    rows={6}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default SeasonInformationFormSection;
