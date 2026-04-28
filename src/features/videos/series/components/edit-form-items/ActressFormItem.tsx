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

interface SelectedActress {
  cast: string;
  name?: string;
  characterName?: string;
  sortOrder: number;
  _id: string;
}

const SortableItem = ({
  actress,
  index,
  editingIndex,
  editCharacterName,
  startEditing,
  saveEditing,
  cancelEditing,
  handleRemoveActress,
  setEditCharacterName,
}: {
  actress: SelectedActress;
  index: number;
  editingIndex: number | null;
  editCharacterName: string;
  startEditing: (index: number) => void;
  saveEditing: (index: number) => void;
  cancelEditing: () => void;
  handleRemoveActress: (index: number) => void;
  setEditCharacterName: (value: string) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: actress.cast });

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
          <span className="font-medium">{actress.name}</span>
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
              {actress?.sortOrder + 1}.
              {actress.characterName && (
                <span className="text-muted-foreground ml-2">
                  {actress.characterName} အဖြစ်{" "}
                </span>
              )}
              <span className="font-medium">{actress.name}</span>
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
              onClick={() => handleRemoveActress(index)}
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

const ActressFormItem = ({ form, data }: { form: any; data: any }) => {
  const { data: castData } = useCast();
  const [selectedActressId, setSelectedActressId] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [selectedActress, setSelectedActress] = useState<SelectedActress[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editCharacterName, setEditCharacterName] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddActress = () => {
    if (!selectedActressId) return;

    const isAlreadySelected = selectedActress.some(
      (actress) => actress.cast === selectedActressId
    );
    if (isAlreadySelected) return;

    const selectedActressData = castData?.data.find(
      (item: any) => item._id === selectedActressId
    );
    if (!selectedActressData) return;

    const newActress: SelectedActress = {
      cast: selectedActressId,
      name: selectedActressData.name,
      characterName: characterName,
      sortOrder: selectedActress.length,
      _id: selectedActressId,
    };

    const updatedActress = [...selectedActress, newActress];
    setSelectedActress(updatedActress);
    form.setValue("actresses", updatedActress);

    setSelectedActressId("");
    setCharacterName("");
  };

  const handleRemoveActress = (index: number) => {
    const updatedActress = selectedActress
      .filter((_, i) => i !== index)
      .map((actress, i) => ({ ...actress, sortOrder: i }));
    setSelectedActress(updatedActress);
    form.setValue("actresses", updatedActress);
    if (editingIndex === index) setEditingIndex(null);
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    selectedActress[index].characterName &&
      setEditCharacterName(selectedActress[index].characterName);
  };

  const saveEditing = (index: number) => {
    const updatedActress = [...selectedActress];
    updatedActress[index] = {
      ...updatedActress[index],
      characterName: editCharacterName,
    };
    setSelectedActress(updatedActress);
    form.setValue("actresses", updatedActress);
    setEditingIndex(null);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
  };

  const isActressSelected = (actressId: string) => {
    return selectedActress.some((actress) => actress.cast === actressId);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = selectedActress.findIndex(
      (actor) => actor.cast === active.id
    );
    const newIndex = selectedActress.findIndex(
      (actor) => actor.cast === over.id
    );

    const updatedActors = arrayMove(selectedActress, oldIndex, newIndex).map(
      (actor, index) => ({
        ...actor,
        sortOrder: index,
      })
    );

    setSelectedActress(updatedActors);

    form.setValue(
      "actresses",
      updatedActors.map((actor) => ({
        cast: actor._id,
        sortOrder: actor.sortOrder,
        characterName: actor.characterName || undefined,
      }))
    );
  };

  useEffect(() => {
    if (data) {
      setSelectedActress(
        data?.actresses?.map((el: any) => {
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
        "actresses",
        data?.actresses?.map((el: any) => {
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
        name="actresses"
        render={() => (
          <FormItem>
            <FormLabel>Actress</FormLabel>
            <div className="grid grid-cols-5 gap-2">
              <div className={`col-span-2 relative`}>
                <Select
                  value={selectedActressId}
                  onValueChange={(value) => setSelectedActressId(value)}
                >
                  <FormControl>
                    <SelectTrigger className="h-11 bg-gray border-[1.5px] border-dark/30">
                      <SelectValue placeholder="Select actress" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {castData?.data
                      ?.filter((el: any) => el?.role?.role == "Actress")
                      ?.map((item: any) => {
                        const selected = isActressSelected(item._id);
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
                onClick={handleAddActress}
                className={`size-10 ${
                  !selectedActressId || isActressSelected(selectedActressId)
                    ? "text-dark"
                    : "text-white"
                } !p-0 col-span-1 rounded-full`}
                variant={
                  !selectedActressId || isActressSelected(selectedActressId)
                    ? "outline"
                    : "default"
                }
                disabled={
                  !selectedActressId || isActressSelected(selectedActressId)
                }
              >
                <Plus className="size-4" />
              </Button>
            </div>

            <FormMessage />
          </FormItem>
        )}
      />

      {selectedActress.length > 0 && (
        <div className="space-y-2 w-[80%]">
          <h4 className="text-sm font-medium">Selected Actress:</h4>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={selectedActress.map((actress) => actress.cast)}
              strategy={verticalListSortingStrategy}
            >
              <ul className="space-y-2">
                {selectedActress.map((actress, index) => (
                  <SortableItem
                    key={actress.cast}
                    actress={actress}
                    index={index}
                    editingIndex={editingIndex}
                    editCharacterName={editCharacterName}
                    startEditing={startEditing}
                    saveEditing={saveEditing}
                    cancelEditing={cancelEditing}
                    handleRemoveActress={handleRemoveActress}
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

export default ActressFormItem;
