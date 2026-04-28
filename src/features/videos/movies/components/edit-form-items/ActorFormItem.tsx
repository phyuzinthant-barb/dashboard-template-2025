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

interface SelectedActors {
  cast: string;
  name?: string;
  characterName?: string;
  sortOrder: number;
}

const SortableItem = ({
  actors,
  index,
  editingIndex,
  editCharacterName,
  startEditing,
  saveEditing,
  cancelEditing,
  handleRemoveActors,
  setEditCharacterName,
}: {
  actors: SelectedActors;
  index: number;
  editingIndex: number | null;
  editCharacterName: string;
  startEditing: (index: number) => void;
  saveEditing: (index: number) => void;
  cancelEditing: () => void;
  handleRemoveActors: (index: number) => void;
  setEditCharacterName: (value: string) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: actors.cast });

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
          <span className="font-medium">{actors.name}</span>
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
              {actors?.sortOrder + 1}.
              <span className="font-medium">{actors.name}</span>
              {actors.characterName && (
                <span className="text-muted-foreground ml-2">
                  ( {actors.characterName} )
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
              onClick={() => handleRemoveActors(index)}
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

const actorsFormItem = ({ form, data }: { form: any; data: any }) => {
  const { data: castData } = useCast();
  const [selectedActorsId, setSelectedActorsId] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [selectedActors, setSelectedActors] = useState<SelectedActors[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editCharacterName, setEditCharacterName] = useState("");

  console.log(selectedActors);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddActors = () => {
    if (!selectedActorsId) return;

    const isAlreadySelected = selectedActors.some(
      (actors) => actors.cast === selectedActorsId
    );
    if (isAlreadySelected) return;

    const selectedActorsData = castData?.data.find(
      (item: any) => item._id === selectedActorsId
    );
    if (!selectedActorsData) return;

    const newActors: SelectedActors = {
      cast: selectedActorsId,
      name: selectedActorsData.name,
      characterName: characterName,
      sortOrder: selectedActors.length,
    };

    const updatedActors = [...selectedActors, newActors];
    setSelectedActors(updatedActors);
    form.setValue("actors", updatedActors);

    setSelectedActorsId("");
    setCharacterName("");
  };

  const handleRemoveActors = (index: number) => {
    const updatedActors = selectedActors
      .filter((_, i) => i !== index)
      .map((actors, i) => ({ ...actors, sortOrder: i }));
    setSelectedActors(updatedActors);
    form.setValue("actors", updatedActors);
    if (editingIndex === index) setEditingIndex(null);
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    selectedActors[index].characterName &&
      setEditCharacterName(selectedActors[index].characterName);
  };

  const saveEditing = (index: number) => {
    const updatedActors = [...selectedActors];
    updatedActors[index] = {
      ...updatedActors[index],
      characterName: editCharacterName,
    };
    setSelectedActors(updatedActors);
    form.setValue("actors", updatedActors);
    setEditingIndex(null);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
  };

  const isActorsSelected = (actorsId: string) => {
    return selectedActors.some((actors) => actors.cast === actorsId);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = selectedActors.findIndex(
      (actor) => actor.cast === active.id
    );
    const newIndex = selectedActors.findIndex(
      (actor) => actor.cast === over.id
    );

    const updatedActors = arrayMove(selectedActors, oldIndex, newIndex).map(
      (actor, index) => ({
        ...actor,
        sortOrder: index,
      })
    );

    setSelectedActors(updatedActors);

    form.setValue(
      "actors",
      updatedActors.map((actor) => ({
        cast: actor.cast,
        sortOrder: actor.sortOrder,
        characterName: actor.characterName || undefined,
      }))
    );
  };

  useEffect(() => {
    if (data) {
      setSelectedActors(
        data?.actors?.map((el: any) => {
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
        "actors",
        data?.actors?.map((el: any) => {
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
        name="actors"
        render={() => (
          <FormItem>
            <FormLabel>Actors</FormLabel>
            <div className="grid grid-cols-5 gap-2">
              <div className={`col-span-2 relative`}>
                <Select
                  value={selectedActorsId}
                  onValueChange={(value) => setSelectedActorsId(value)}
                >
                  <FormControl>
                    <SelectTrigger className="h-11 bg-gray border-[1.5px] border-dark/30">
                      <SelectValue placeholder="Select actors" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {castData?.data
                      ?.filter((el: any) => el?.role?.role == "Actor")
                      ?.map((item: any) => {
                        const selected = isActorsSelected(item._id);
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
                onClick={handleAddActors}
                className={`size-10 ${
                  !selectedActorsId || isActorsSelected(selectedActorsId)
                    ? "text-dark"
                    : "text-white"
                } !p-0 col-span-1 rounded-full`}
                variant={
                  !selectedActorsId || isActorsSelected(selectedActorsId)
                    ? "outline"
                    : "default"
                }
                disabled={
                  !selectedActorsId || isActorsSelected(selectedActorsId)
                }
              >
                <Plus className="size-4" />
              </Button>
            </div>

            <FormMessage />
          </FormItem>
        )}
      />

      {selectedActors.length > 0 && (
        <div className="space-y-2 w-[80%]">
          <h4 className="text-sm font-medium">Selected actors:</h4>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={selectedActors.map((actors) => actors.cast)}
              strategy={verticalListSortingStrategy}
            >
              <ul className="space-y-2">
                {selectedActors.map((actors, index) => (
                  <SortableItem
                    key={actors.cast}
                    actors={actors}
                    index={index}
                    editingIndex={editingIndex}
                    editCharacterName={editCharacterName}
                    startEditing={startEditing}
                    saveEditing={saveEditing}
                    cancelEditing={cancelEditing}
                    handleRemoveActors={handleRemoveActors}
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

export default actorsFormItem;
