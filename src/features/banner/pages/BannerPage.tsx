import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import useBanner from "../hooks/useBanner";
import TableSkeletonLoader from "@/components/TableSkeleton";
import ConfirmDelete from "@/components/ConfirmDelete";
import { Plus, GripVertical } from "lucide-react";
import { useProfile } from "@/features/auth/hooks/useProfile";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useUpdateBannerOrderMutation } from "../services/bannerService";

interface BannerItem {
  _id: string;
  imageUrl: string;
  title?: string;
  sortOrder: number;
}

const SortableBannerItem = ({
  banner,
  index,
  onDelete,
}: {
  banner: BannerItem;
  index: number;
  onDelete: (id: string) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: banner._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : "auto",
    opacity: isDragging ? 0.8 : 1,
  };

  const { isAuthorized } = useProfile();

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white items-center flex justify-between my-4 py-4 px-4 rounded"
    >
      <div className="items-center gap-3 flex">
        <Button
          variant="ghost"
          size="icon"
          type="button"
          className="cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </Button>
        <p>{index + 1}.</p>
        <img
          src={banner?.imageUrl}
          alt={banner?.title || `Banner ${index + 1}`}
          className="rounded object-cover size-[150px]"
        />
      </div>
      {isAuthorized("Banners", "Delete") && (
        <Button
          onClick={() => onDelete(banner._id)}
          className="px-6"
          variant={"outline"}
        >
          Delete
        </Button>
      )}
    </div>
  );
};

const BannerPage = () => {
  const { data, gettingBanners, deleteBanner } = useBanner();
  const { isAuthorized } = useProfile();
  const nav = useNavigate();
  const [updateBannerOrder] = useUpdateBannerOrderMutation();

  const deleteRef = useRef<HTMLButtonElement | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [banners, setBanners] = useState<BannerItem[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Update local banners state when data changes
  useEffect(() => {
    if (data?.data) {
      const sortedBanners = [...data.data]
        .sort((a: any, b: any) => {
          const sortOrderA = a.sortOrder ?? 0;
          const sortOrderB = b.sortOrder ?? 0;
          return sortOrderA - sortOrderB;
        })
        .map((banner: any, index: number) => ({
          ...banner,
          sortOrder: index,
        }));
      setBanners(sortedBanners);
    }
  }, [data]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = banners.findIndex((banner) => banner._id === active.id);
    const newIndex = banners.findIndex((banner) => banner._id === over.id);

    const reorderedBanners = arrayMove(banners, oldIndex, newIndex).map(
      (banner, index) => ({
        ...banner,
        sortOrder: index,
      })
    );

    setBanners(reorderedBanners);

    // Send update to server for affected items
    try {
      const updates = reorderedBanners.map((banner) => ({
        id: banner._id,
        sortOrder: banner.sortOrder + 1,
      }));

      await updateBannerOrder({ updates }).unwrap();
      toast.success("Banner order updated successfully", {
        position: "top-center",
        className: "!bg-green-400 !text-white",
      });
    } catch (error) {
      toast.error("Failed to update banner order", {
        position: "top-center",
        className: "!bg-red-400 !text-white",
      });
      // Revert to original order on error
      if (data?.data) {
        setBanners(data.data);
      }
    }
  };

  const handleDelete = (id: string) => {
    deleteRef?.current?.click();
    setDeleteId(id);
  };

  return (
    <section>
      <div className="flex w-full mb-4 justify-between">
        <div className="flex flex-col gap-3">
          <p className="font-bold text-xl ">Banner List</p>
        </div>

        <Button
          onClick={() => {
            if (!isAuthorized("Banners", "Create")) {
              toast.error("You are not authorized to add banners", {
                position: "top-center",
                className: "!bg-red-400 !text-white",
              });
              return;
            }
            nav("/cms/banner/add");
          }}
          className=" h-12 px-4"
          size={"lg"}
        >
          <Plus /> <span className=" ms-1">Add New Banner</span>
        </Button>
      </div>

      <div className=" mt-4">
        <>
          {gettingBanners ? (
            <TableSkeletonLoader />
          ) : (
            <>
              <div className=" rounded-xl mt-4 ">
                <div className="px-4 py-5 ">
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={banners.map((banner) => banner._id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {banners.map((banner, index) => (
                        <SortableBannerItem
                          key={banner._id}
                          banner={banner}
                          index={index}
                          onDelete={handleDelete}
                        />
                      ))}
                    </SortableContext>
                  </DndContext>
                </div>
              </div>
            </>
          )}
        </>
      </div>

      <ConfirmDelete
        ref={deleteRef}
        cancel={() => setDeleteId(null)}
        run={() => deleteBanner(deleteId as string)}
      />
    </section>
  );
};

export default BannerPage;
