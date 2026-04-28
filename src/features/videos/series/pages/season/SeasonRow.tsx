import { TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Edit3, Eye, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import ConfirmDelete from "@/components/ConfirmDelete";
import useSeason from "../../hooks/useSeason";
import { useProfile } from "@/features/auth/hooks/useProfile";
import { toast } from "sonner";

const SeasonRow = ({ item }: any) => {
  const nav = useNavigate();
  const { deleteSeason } = useSeason();
  const { isAuthorized } = useProfile();

  const deleteRef = useRef<HTMLButtonElement | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  return (
    <>
      {item.seasons?.map((el: any, subIndex: number) => (
        <TableRow key={subIndex}>
          <TableCell colSpan={4} className="text-center"></TableCell>
          <TableCell>{el?.name}</TableCell>
          <TableCell colSpan={4} className=" text-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="!py-0.5 !px-2 font-normal text-sm"
                  size={"sm"}
                  variant="outline"
                >
                  Action
                  <Icon
                    icon={"mdi:triangle-small-down"}
                    width={"24"}
                    height={"24"}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 me-1">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => {
                      if (!isAuthorized("Episodes", "Create")) {
                        toast.error("You are not authorized to add series", {
                          position: "top-center",
                          className: "!bg-red-400 !text-white",
                        });
                        return;
                      }
                      nav(`/video-list/series/season/episode/add/${el._id}`);
                    }}
                    className="my-1.5"
                  >
                    <Plus className=" size-4" />
                    <span className="ms-1">Add Episode</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() =>
                      nav(`/video-list/series/season/detail/${el._id}`)
                    }
                    className="my-1.5"
                  >
                    <Eye className=" size-4" />
                    <span className="ms-1">View</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => {
                      if (!isAuthorized("Episodes", "update")) {
                        toast.error("You are not authorized to update series", {
                          position: "top-center",
                          className: "!bg-red-400 !text-white",
                        });
                      }
                      nav(`/video-list/series/season/edit/${el._id}`);
                    }}
                    className="my-1.5"
                  >
                    <Edit3 className=" size-4" />
                    <span className="ms-1">Edit</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => {
                      if (!isAuthorized("Season", "delete")) {
                        toast.error("You are not authorized to delete series", {
                          position: "top-center",
                          className: "!bg-red-400 !text-white",
                        });
                      }
                      deleteRef?.current?.click();
                      setDeleteId(el._id);
                    }}
                    className="my-1.5"
                  >
                    <Trash2 className=" size-4" />
                    <span className="ms-1">Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
      <ConfirmDelete
        ref={deleteRef}
        cancel={() => setDeleteId(null)}
        run={() => deleteSeason(deleteId as string)}
      />
    </>
  );
};

export default SeasonRow;
