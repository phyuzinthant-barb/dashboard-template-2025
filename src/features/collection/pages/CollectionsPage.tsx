import { Button } from "@/components/ui/button";
import { Edit3, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeletonLoader from "@/components/TableSkeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import ConfirmDelete from "@/components/ConfirmDelete";
import { useProfile } from "@/features/auth/hooks/useProfile";
import { toast } from "sonner";
import useCollection from "../hooks/useCollection";
import EditCollectionBox from "../components/EditCollectionBox";
import AddCollectionBox from "../components/AddCollectionBox";
import { CollectionItem } from "../types";

const CollectionPage = () => {
  const { isAuthorized } = useProfile();
  const { data, gettingCategories, deleteCollection } = useCollection();

  const ref = useRef<HTMLButtonElement | null>(null);
  const editRef = useRef<HTMLButtonElement | null>(null);
  const deleteRef = useRef<HTMLButtonElement | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [editCollectionData, setEditCollectionData] =
    useState<CollectionItem | null>(null);

  return (
    <section>
      <div className=" flex justify-between items-center">
        <p className=" text-xl font-semibold">Collections</p>
        <Button
          onClick={() => {
            if (!isAuthorized("Collection", "Create")) {
              toast.error(
                "You are not authorized to add content related to videos!",
                {
                  position: "top-center",
                  className: "!bg-red-400 !text-white",
                }
              );
              return;
            }
            ref?.current?.click();
          }}
          size={"lg"}
          className=" h-12 px-4"
        >
          <Plus className=" me-3" />
          Add New Collection
        </Button>
      </div>

      <div className=" mt-4">
        <>
          {gettingCategories ? (
            <TableSkeletonLoader />
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow className=" !bg-transparent">
                    <TableHead>#</TableHead>
                    <TableHead>Collection</TableHead>
                    <TableHead>Items Count</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        Start Adding Data :)
                      </TableCell>
                    </TableRow>
                  )}
                  {data?.data?.map((item: any, index: number) => (
                    <TableRow key={item._id}>
                      <TableCell className=" w-[50px]">{index + 1}.</TableCell>
                      <TableCell>{item?.name}</TableCell>
                      <TableCell>{item?.items?.length || 0} items</TableCell>
                      <TableCell className=" text-end">
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
                          <DropdownMenuContent className="w-12 me-1">
                            <DropdownMenuGroup>
                              <DropdownMenuItem
                                onClick={() => {
                                  if (!isAuthorized("Collection", "Update")) {
                                    toast.error(
                                      "You are not authorized to update content related to videos!",
                                      {
                                        position: "top-center",
                                        className: "!bg-red-400 !text-white",
                                      }
                                    );
                                    return;
                                  }
                                  editRef?.current?.click();
                                  setEditId(item._id);
                                  setEditCollectionData(item); // Pass the entire item data
                                }}
                                className="my-1.5"
                              >
                                <Edit3 className=" size-4" />{" "}
                                <span className="ms-1">Edit</span>
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() => {
                                  if (!isAuthorized("Collection", "Delete")) {
                                    toast.error(
                                      "You are not authorized to delete content related to videos!",
                                      {
                                        position: "top-center",
                                        className: "!bg-red-400 !text-white",
                                      }
                                    );
                                    return;
                                  }
                                  deleteRef?.current?.click();
                                  setDeleteId(item._id);
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
                </TableBody>
              </Table>
            </>
          )}
        </>
      </div>

      <AddCollectionBox ref={ref} />

      <EditCollectionBox
        ref={editRef}
        id={editId}
        setId={setEditId}
        data={editCollectionData}
        setData={setEditCollectionData}
      />

      <ConfirmDelete
        ref={deleteRef}
        cancel={() => setDeleteId(null)}
        run={() => deleteCollection(deleteId as string)}
      />
    </section>
  );
};

export default CollectionPage;
