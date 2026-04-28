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

interface SelectedActor {
  cast: string;
  name?: string;
  characterName?: string;
  sortOrder: number;
  _id: string;
}

const SortableItem = ({
  actor,
  index,
  editingIndex,
  editCharacterName,
  startEditing,
  saveEditing,
  cancelEditing,
  handleRemoveActor,
  setEditCharacterName,
}: {
  actor: SelectedActor;
  index: number;
  editingIndex: number | null;
  editCharacterName: string;
  startEditing: (index: number) => void;
  saveEditing: (index: number) => void;
  cancelEditing: () => void;
  handleRemoveActor: (index: number) => void;
  setEditCharacterName: (value: string) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: actor.cast });

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
      className="flex items-center justify-between p-2 border-dark/30 rounded-lg border-[1.5px] bg-gray"
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
          <span className="font-medium">{actor.name}</span>
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
              {actor?.sortOrder + 1}.
              <span className="font-medium">{actor.name}</span>
              {actor.characterName && (
                <span className="text-muted-foreground ml-2">
                  ({actor.characterName})
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
              onClick={() => handleRemoveActor(index)}
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

const ActorFormItem = ({ form, data }: { form: any; data: any }) => {
  const { data: castData } = useCast();
  const [selectedActorId, setSelectedActorId] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [selectedActors, setSelectedActors] = useState<SelectedActor[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editCharacterName, setEditCharacterName] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddActor = () => {
    if (!selectedActorId) return;

    const isAlreadySelected = selectedActors.some(
      (actor) => actor.cast === selectedActorId
    );
    if (isAlreadySelected) return;

    const selectedActor = castData?.data.find(
      (item: any) => item._id === selectedActorId
    );
    if (!selectedActor) return;

    const newActor: SelectedActor = {
      cast: selectedActorId,
      name: selectedActor.name,
      characterName: characterName,
      sortOrder: selectedActors.length,
      _id: selectedActorId,
    };

    const updatedActors = [...selectedActors, newActor];
    setSelectedActors(updatedActors);
    form.setValue("actors", updatedActors);

    setSelectedActorId("");
    setCharacterName("");
  };

  const handleRemoveActor = (index: number) => {
    const updatedActors = selectedActors
      .filter((_, i) => i !== index)
      .map((actor, i) => ({ ...actor, sortOrder: i }));
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

  const isActorSelected = (actorId: string) => {
    return selectedActors.some((actor) => actor.cast === actorId);
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
  }, [data, selectedActors, form]);

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
                  value={selectedActorId}
                  onValueChange={(value) => setSelectedActorId(value)}
                >
                  <FormControl>
                    <SelectTrigger className="h-11 bg-gray border-[1.5px] border-dark/30">
                      <SelectValue placeholder="Select Actor" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {castData?.data
                      ?.filter((el: any) => el?.role?.role == "Actor")
                      ?.map((item: any) => {
                        const selected = isActorSelected(item._id);
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
                onClick={handleAddActor}
                className={`size-10 ${
                  !selectedActorId || isActorSelected(selectedActorId)
                    ? "text-dark"
                    : "text-white"
                } !p-0 col-span-1 rounded-full`}
                variant={
                  !selectedActorId || isActorSelected(selectedActorId)
                    ? "outline"
                    : "default"
                }
                disabled={!selectedActorId || isActorSelected(selectedActorId)}
              >
                <Plus className="size-4" />
              </Button>
            </div>

            <FormMessage />
          </FormItem>
        )}
      />

      {selectedActors.length > 0 && (
        <div className="space-y-2  w-[80%]">
          <h4 className="text-sm font-medium">Selected Actors:</h4>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={selectedActors.map((actor) => actor.cast)}
              strategy={verticalListSortingStrategy}
            >
              <ul className="space-y-2">
                {selectedActors.map((actor, index) => (
                  <SortableItem
                    key={actor.cast}
                    actor={actor}
                    index={index}
                    editingIndex={editingIndex}
                    editCharacterName={editCharacterName}
                    startEditing={startEditing}
                    saveEditing={saveEditing}
                    cancelEditing={cancelEditing}
                    handleRemoveActor={handleRemoveActor}
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

export default ActorFormItem;
