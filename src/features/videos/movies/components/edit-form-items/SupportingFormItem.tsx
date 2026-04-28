import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCast from "@/features/cast/hooks/useCast";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Plus, Pencil, X, Trash2, GripVertical } from "lucide-react";
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

interface SelectedSupports {
  cast: string;
  name?: string;
  characterName?: string;
  sortOrder: number;
}

const SortableItem = ({
  supports,
  index,
  editingIndex,
  editCharacterName,
  startEditing,
  saveEditing,
  cancelEditing,
  handleRemoveSupports,
  setEditCharacterName,
}: {
  supports: SelectedSupports;
  index: number;
  editingIndex: number | null;
  editCharacterName: string;
  startEditing: (index: number) => void;
  saveEditing: (index: number) => void;
  cancelEditing: () => void;
  handleRemoveSupports: (index: number) => void;
  setEditCharacterName: (value: string) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: supports.cast });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : "auto",
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between p-2 border rounded bg-background"
    >
      {editingIndex === index ? (
        <div className="flex items-center gap-2 w-full">
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
          <span className="font-medium">{supports.name}</span>
          <Input
            value={editCharacterName}
            onChange={(e) => setEditCharacterName(e.target.value)}
            placeholder="Character name"
            className="flex-1"
          />
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={() => saveEditing(index)}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={cancelEditing}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2">
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
            <div>
              {supports?.sortOrder + 1}.
              <span className="font-medium">{supports.name}</span>
              {supports.characterName && (
                <span className="text-muted-foreground ml-2">
                  ({supports.characterName})
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={() => startEditing(index)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveSupports(index)}
              type="button"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </li>
  );
};

const SupportsFormItem = ({ form, data }: { form: any; data: any }) => {
  const { data: castData } = useCast();
  const [selectedSupportsId, setSelectedSupportsId] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [selectedSupports, setSelectedSupports] = useState<SelectedSupports[]>(
    []
  );
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editCharacterName, setEditCharacterName] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddSupports = () => {
    if (!selectedSupportsId) return;

    const isAlreadySelected = selectedSupports.some(
      (supports) => supports.cast === selectedSupportsId
    );
    if (isAlreadySelected) return;

    const selectedSupportsData = castData?.data.find(
      (item: any) => item._id === selectedSupportsId
    );
    if (!selectedSupportsData) return;

    const newSupports: SelectedSupports = {
      cast: selectedSupportsId,
      name: selectedSupportsData.name,
      characterName: characterName,
      sortOrder: selectedSupports.length,
    };

    const updatedSupports = [...selectedSupports, newSupports];
    setSelectedSupports(updatedSupports);
    form.setValue("supports", updatedSupports);

    setSelectedSupportsId("");
    setCharacterName("");
  };

  const handleRemoveSupports = (index: number) => {
    const updatedSupports = selectedSupports
      .filter((_, i) => i !== index)
      .map((supports, i) => ({ ...supports, sortOrder: i }));
    setSelectedSupports(updatedSupports);
    form.setValue("supports", updatedSupports);
    if (editingIndex === index) setEditingIndex(null);
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    selectedSupports[index].characterName &&
      setEditCharacterName(selectedSupports[index].characterName);
  };

  const saveEditing = (index: number) => {
    const updatedSupports = [...selectedSupports];
    updatedSupports[index] = {
      ...updatedSupports[index],
      characterName: editCharacterName,
    };
    setSelectedSupports(updatedSupports);
    form.setValue("supports", updatedSupports);
    setEditingIndex(null);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
  };

  const isSupportsSelected = (supportsId: string) => {
    return selectedSupports.some((supports) => supports.cast === supportsId);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = selectedSupports.findIndex(
      (actor) => actor.cast === active.id
    );
    const newIndex = selectedSupports.findIndex(
      (actor) => actor.cast === over.id
    );

    const updatedActors = arrayMove(selectedSupports, oldIndex, newIndex).map(
      (actor, index) => ({
        ...actor,
        sortOrder: index,
      })
    );
    setSelectedSupports(updatedActors);
    form.setValue(
      "supports",
      updatedActors.map((actor) => ({
        cast: actor.cast,
        sortOrder: actor.sortOrder,
        characterName: actor.characterName || undefined,
      }))
    );
  };

  useEffect(() => {
    if (data) {
      setSelectedSupports(
        data?.supports?.map((el: any) => {
          return {
            cast: el?.cast?._id,
            characterName: el?.characterName,
            name: el?.cast?.name,
            sortOrder: el?.sortOrder,
            _id: el?._id,
          };
        })
      );

      form.setValue(
        "supports",
        data?.supports?.map((el: any) => {
          return {
            cast: el?.cast?._id,
            characterName: el?.characterName,
            name: el?.cast?.name,
            sortOrder: el?.sortOrder,
            _id: el?._id,
          };
        })
      );
    }
  }, [data]);

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="supports"
        render={() => (
          <FormItem>
            <FormLabel>Supports</FormLabel>
            <div className="grid grid-cols-5 gap-2">
              <div className={`col-span-2 relative`}>
                <Select
                  value={selectedSupportsId}
                  onValueChange={(value) => setSelectedSupportsId(value)}
                >
                  <FormControl>
                    <SelectTrigger className="h-11 bg-gray border-[1.5px] border-dark/30">
                      <SelectValue placeholder="Select Supports" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {castData?.data
                      ?.filter((el: any) => el?.role?.role == "Supporting")
                      ?.map((item: any) => {
                        const selected = isSupportsSelected(item._id);
                        return (
                          <SelectItem
                            key={item._id}
                            value={item._id}
                            disabled={selected}
                          >
                            <div className="items-center justify-between flex">
                              <span>{item.name}</span>
                              {selected && <Check className="h-4 w-4 ml-2" />}
                            </div>
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Input
                  placeholder="Character name (optional)"
                  value={characterName}
                  onChange={(e) => setCharacterName(e.target.value)}
                />
              </div>

              <Button
                type="button"
                onClick={handleAddSupports}
                className={`size-10 ${
                  !selectedSupportsId || isSupportsSelected(selectedSupportsId)
                    ? "text-dark"
                    : "text-white"
                } !p-0 col-span-1 rounded-full`}
                variant={
                  !selectedSupportsId || isSupportsSelected(selectedSupportsId)
                    ? "outline"
                    : "default"
                }
                disabled={
                  !selectedSupportsId || isSupportsSelected(selectedSupportsId)
                }
              >
                <Plus className="size-4" />
              </Button>
            </div>

            <FormMessage />
          </FormItem>
        )}
      />

      {selectedSupports.length > 0 && (
        <div className="space-y-2 w-[80%]">
          <h4 className="text-sm font-medium">Selected supports:</h4>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={selectedSupports.map((supports) => supports.cast)}
              strategy={verticalListSortingStrategy}
            >
              <ul className="space-y-2">
                {selectedSupports.map((supports, index) => (
                  <SortableItem
                    key={supports.cast}
                    supports={supports}
                    index={index}
                    editingIndex={editingIndex}
                    editCharacterName={editCharacterName}
                    startEditing={startEditing}
                    saveEditing={saveEditing}
                    cancelEditing={cancelEditing}
                    handleRemoveSupports={handleRemoveSupports}
                    setEditCharacterName={setEditCharacterName}
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
};

export default SupportsFormItem;
