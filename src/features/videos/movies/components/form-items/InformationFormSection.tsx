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
import RedStar from "@/components/RedStar";

const InformationFormSection = ({ form }: any) => {
  const { data: categoriesData } = useCategory();
  const { data: genresData } = useGenre();

  const plan = form.watch("plan");

  return (
    <section className=" bg-white  rounded-xl">
      <div className="p-4 text-xl border-b-[1.5px] font-bold border-b-blue-800">
        Add New Movie
      </div>
      <div className="!text-dark !mt-0 px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="posterImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" flex gap-1.5 items-center">
                  Upload Poster Photo (PNG or JPG) <RedStar />
                </FormLabel>
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
                <FormLabel className=" flex gap-1.5 items-center">
                  Upload Banner Photo (PNG or JPG) <RedStar />
                </FormLabel>
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
              <FormItem>
                <FormLabel className=" flex gap-1.5 items-center">
                  Movie Name <RedStar />
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Movie Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className=" ">
                <FormLabel className=" flex gap-1.5 items-center">
                  Category <RedStar />
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className=" h-11 bg-gray border-[1.5px]  border-dark/30">
                      <SelectValue placeholder="Select Category" />
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

          <div className=" col-span-full gap-4 grid grid-cols-4">
            {/* genre  */}
            <FormField
              control={form.control}
              name="genres"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className=" flex gap-1.5 items-center">
                    Genres <RedStar />
                  </FormLabel>
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
                <FormItem className=" ">
                  <FormLabel className=" flex gap-1.5 items-center">
                    Type <RedStar />
                  </FormLabel>
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
                      {["FREE", "PAID", "PAY_PER_VIEW"]?.map((item: any) => (
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

            {/* duration */}
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" flex gap-1.5 items-center">
                    Duration (minutes) <RedStar />
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      placeholder="Duration in minutes"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* price */}

            {plan == "PAY_PER_VIEW" && (
              <FormField
                control={form.control}
                name="payPerViewPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" flex gap-1.5 items-center">
                      Price <RedStar />
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                        placeholder="Price"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          {/* tags */}

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start col-span-full">
                <FormLabel className="text-left flex gap-1.5 items-center">
                  Tags <RedStar />
                </FormLabel>
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
                <FormLabel className=" flex gap-1.5 items-center">
                  Script Writer <RedStar />
                </FormLabel>
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
                <FormLabel className=" flex gap-1.5 items-center">
                  Directors <RedStar />
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Directors" />
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
