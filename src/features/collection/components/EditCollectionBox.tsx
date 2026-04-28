import React, { useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import useCollection from "../hooks/useCollection";
import { CollectionItem } from "../types";
import useMovie from "@/features/videos/movies/hooks/useMovie";
import useSeries from "@/features/videos/series/hooks/useSeries";
import { CheckboxList } from "@/components/ui/checkbox-list";

// Forward ref to the EditCollectionBox component
const EditCollectionBox = React.forwardRef<
  HTMLButtonElement,
  {
    id: string | null;
    setId: React.Dispatch<React.SetStateAction<string | null>>;
    data: CollectionItem | null;
    setData: React.Dispatch<React.SetStateAction<CollectionItem | null>>;
  }
>(({ id, setId, data, setData }, ref) => {
  const CollectionSchema = z.object({
    name: z.string().min(1, "Name is required"),
    items: z
      .array(
        z.object({
          reference: z.string(),
          referenceModel: z.enum(["Movie", "Series"]),
        })
      )
      .min(1, "At least one item is required"),
  });

  const { data: movieData } = useMovie();
  const { data: seriesData } = useSeries();

  const [open, setOpen] = useState(false);

  const form = useForm<CollectionFormValues>({
    resolver: zodResolver(CollectionSchema),
  });

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const { updateCollection, updating, updated } = useCollection();

  const combinedOptions = [
    ...(movieData?.data?.map((movie: any) => ({
      label: `${movie.name} (Movie)`,
      value: `${movie._id}|Movie`,
      type: "Movie",
    })) || []),
    ...(seriesData?.data?.map((series: any) => ({
      label: `${series.name} (Series)`,
      value: `${series._id}|Series`,
      type: "Series",
    })) || []),
  ];

  type CollectionFormValues = z.infer<typeof CollectionSchema>;

  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (updated) {
      setOpen(false);
      form.reset();
      setId(null);
      setData(null);
    }
  }, [updated, form]);

  useEffect(() => {
    if (data) {
      form.setValue("name", data.name);
      setSelectedItems(
        data.items.map((item) => `${item.reference._id}|${item.referenceModel}`)
      );
      
      // Also set the items field for validation
      const formattedItems = data.items.map((item) => ({
        reference: item.reference._id,
        referenceModel: item.referenceModel,
      }));
      form.setValue("items", formattedItems);
    }
  }, [data, form]);

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <Button ref={ref} className="hidden" variant="outline"></Button>
      </AlertDialogTrigger>
      <Form {...form}>
        <AlertDialogContent className="min-w-[600px] block !p-0">
          <AlertDialogHeader>
            <AlertDialogTitle className="p-4 border-b-[1.5px] border-b-blue-800">
              Edit Collection
            </AlertDialogTitle>
            <AlertDialogDescription
              className="!text-dark !mt-0 px-4 py-4"
              asChild
            >
              <form
                onSubmit={form.handleSubmit((data) =>
                  updateCollection(id as string, data)
                )}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2.5">Collection Name</FormLabel>
                      <FormControl>
                        <Input {...field} className="!border-[1px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="items"
                  render={({ field }) => (
                    <FormItem className="my-4">
                      <FormLabel>Movies and Series</FormLabel>
                      <CheckboxList
                        options={combinedOptions}
                        selectedValues={selectedItems}
                        onValueChange={(value: string[]) => {
                          setSelectedItems(value);
                          const items = value.map((item) => {
                            const [reference, referenceModel] = item.split("|");
                            return {
                              reference,
                              referenceModel: referenceModel as
                                | "Movie"
                                | "Series",
                            };
                          });
                          field.onChange(items);
                        }}
                        placeholder="Search movies and series..."
                        maxHeight="300px"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex mt-4 gap-3 justify-end">
                  <AlertDialogCancel
                    ref={closeRef}
                    onClick={() => form.reset()}
                    disabled={updating}
                    type="button"
                  >
                    Cancel
                  </AlertDialogCancel>
                  <Button
                    size={"lg"}
                    className="!px-8"
                    disabled={updating}
                    type="submit"
                  >
                    Update
                  </Button>
                </div>
              </form>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </Form>
    </AlertDialog>
  );
});

export default EditCollectionBox;
