import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUpload } from "@/components/FileUpload";
import { MultipleSelector } from "@/components/ui/MultiSelect";
import useCategory from "@/features/category/hooks/useCategory";
import useGenre from "@/features/genre/hooks/useGenre";
import { Textarea } from "@/components/ui/textarea";

const InformationFormSection = ({ form, data }: any) => {
  const { data: categoriesData } = useCategory();
  const { data: genresData } = useGenre();
  return (
    <section className=" bg-white rounded-xl">
      <div className="p-4 text-xl border-b-[1.5px] font-bold border-b-blue-800">
        Add New Series
      </div>
      <div className="!text-dark !mt-0 px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="posterImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Poster Photo (PNG or JPG)</FormLabel>
                <FormControl>
                  <FileUpload
                    sizeLabel="170 * 230"
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
            name="bannerImage"
            render={({ field }) => (
              <FormItem>
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
                <FormLabel>Series Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Series Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className=" h-11 bg-gray border-[1.5px]  border-dark/30">
                      <SelectValue placeholder={data?.category?.name} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categoriesData?.data.map((item: any) => (
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

          {/* genre  */}
          <FormField
            control={form.control}
            name="genres"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Genres</FormLabel>
                <MultipleSelector
                  className="  min-h-11"
                  placeholder="Select Genres"
                  groupBy="genres"
                  defaultOptions={genresData?.data?.map((el: any) => ({
                    value: el?._id,
                    label: el?.name,
                  }))}
                  options={genresData?.data?.map((el: any) => ({
                    value: el?._id,
                    label: el?.name,
                  }))}
                  value={field?.value?.map((genreId: any) => {
                    const genre = genresData?.data?.find(
                      (g: any) => g._id === genreId
                    );
                    return {
                      label: genre?.name || genreId, // fallback to ID if name not found
                      value: genreId,
                    };
                  })}
                  onChange={(selected) =>
                    field.onChange(selected.map((option) => option.value))
                  }
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* plan */}
          <FormField
            control={form.control}
            name="plan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plan</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className=" h-11 bg-gray border-[1.5px] border-dark/30">
                      <SelectValue placeholder="Select Type" />
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

          {/* tags */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start ">
                <FormLabel className="text-left">Tags</FormLabel>
                <FormControl className="w-full">
                  <Input
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value.split(",").map((tag) => tag.trim())
                      )
                    }
                    placeholder="Enter tags separated by commas"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="scriptWriter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Script Writer</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Script Writer" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* director */}
          <FormField
            control={form.control}
            name="director"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Directors</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Directors" />
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

export default InformationFormSection;
