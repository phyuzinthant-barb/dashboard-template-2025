import RedStar from "@/components/RedStar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const DataFormSection = ({ form }: any) => {
  return (
    <section className=" bg-white  rounded-xl">
      <div className="p-4 text-xl border-b-[1.5px] font-bold border-b-blue-800">
        Movie Information
      </div>

      <div className="grid grid-cols-1 p-4 gap-4">
        <FormField
          control={form.control}
          name="trailerUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" flex gap-1.5 items-center">
                Upload Trailer <RedStar />
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="www.example.mkv" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" flex gap-1.5 items-center">
                Upload Movie Url
                <RedStar />
              </FormLabel>
              <FormControl>
                <Input placeholder="www.example.mkv" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" flex gap-1.5 items-center">
                Description <RedStar />
              </FormLabel>
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
    </section>
  );
};

export default DataFormSection;
