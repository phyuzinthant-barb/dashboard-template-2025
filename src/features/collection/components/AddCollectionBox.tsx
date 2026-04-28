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
import { CollectionFormValues } from "../types";
import { CheckboxList } from "@/components/ui/checkbox-list";
import { useMovieQuery } from "@/features/videos/movies/services/movieService";
import { useSeriesQuery } from "@/features/videos/series/services/seriesService";

// Forward ref to the AddCollectionBox component
const AddCollectionBox = React.forwardRef<HTMLButtonElement>((_, ref) => {
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

  const { data: movieData } = useMovieQuery({
    param: "getAll=true",
  });

  const { data: seriesData } = useSeriesQuery({
    param: "getAll=true",
  });

  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const form = useForm<CollectionFormValues>({
    resolver: zodResolver(CollectionSchema),
    defaultValues: {
      name: "",
      items: [],
    },
  });

  const { addCollection, adding, added } = useCollection();

  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (added) {
      setOpen(false);
      form.reset();
      setSelectedItems([]);
    }
  }, [added, form]);

  // Combine movies and series data for the checkbox list
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

  const handleSubmit = (data: any) => {
    const items = selectedItems.map((item) => {
      const [reference, referenceModel] = item.split("|");
      return {
        reference,
        referenceModel: referenceModel as "Movie" | "Series",
      };
    });

    const formData = {
      name: data.name,
      items,
    };

    addCollection(formData);
  };

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <Button ref={ref} className="hidden" variant="outline"></Button>
      </AlertDialogTrigger>
      <Form {...form}>
        <AlertDialogContent className="min-w-[600px] block !p-0">
          <AlertDialogHeader>
            <AlertDialogTitle className="p-4 border-b-[1.5px] border-b-blue-800">
              Add New Collection
            </AlertDialogTitle>
            <AlertDialogDescription
              className="!text-dark !mt-0 px-4 py-4"
              asChild
            >
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="mb-2.5">Collection Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="!border-[1px]"
                          placeholder="Enter collection name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="items"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Movies and Series</FormLabel>
                      <CheckboxList
                        options={combinedOptions}
                        selectedValues={selectedItems}
                        onValueChange={(value: string[]) => {
                          setSelectedItems(value);
                          // Transform for form validation
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
                    onClick={() => {
                      form.reset();
                      setSelectedItems([]);
                    }}
                    disabled={adding}
                    type="button"
                  >
                    Cancel
                  </AlertDialogCancel>
                  <Button
                    size={"lg"}
                    className="!px-8"
                    disabled={adding}
                    type="submit"
                  >
                    Create
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

export default AddCollectionBox;
