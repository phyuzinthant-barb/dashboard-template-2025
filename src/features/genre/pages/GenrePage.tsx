import { Button } from "@/components/ui/button";
import { Edit3, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import useGenre from "../hooks/useGenre";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeletonLoader from "@/components/TableSkeleton";
import AddGenreBox from "../components/AddGenreBox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import ConfirmDelete from "@/components/ConfirmDelete";
import EditGenreBox from "../components/EditGenreBox";
import { useProfile } from "@/features/auth/hooks/useProfile";
import { toast } from "sonner";
import { PaginationComponent } from "@/components/Pagination";
import usePagination from "@/hooks/usePagination";
import { useSearchParams } from "react-router-dom";

const GenrePage = () => {
  const { isAuthorized } = useProfile();

  const [params] = useSearchParams();

  const { handleLimitChange, handlePageChange } = usePagination();

  const ref = useRef<HTMLButtonElement | null>(null);
  const editRef = useRef<HTMLButtonElement | null>(null);
  const deleteRef = useRef<HTMLButtonElement | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [editData, setEditData] = useState<{
    id: "";
    name: "";
    genreIcon: "";
  }>({
    id: "",
    name: "",
    genreIcon: "",
  });

  const { data, gettingGenres, deleteGenre } = useGenre();

  return (
    <section>
      <div className=" flex justify-between items-center">
        <p className=" text-xl font-semibold">Movie Genres</p>
        <Button
          onClick={() => {
            if (!isAuthorized("Genres", "Create")) {
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
          Add New Genre
        </Button>
      </div>

      <div className=" mt-4">
        <>
          {gettingGenres ? (
            <TableSkeletonLoader />
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow className=" !bg-transparent">
                    <TableHead>#</TableHead>
                    <TableHead>Genre</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center">
                        Start Adding Data :)
                      </TableCell>
                    </TableRow>
                  )}
                  {data?.data?.map((item: any, index: number) => (
                    <TableRow key={item._id}>
                      <TableCell className=" w-[50px]">{index + 1}.</TableCell>
                      <TableCell>
                        <div className=" flex items-center gap-3">
                          <img
                            src={item?.genreIconUrl}
                            alt=""
                            className=" size-12 rounded-lg object-cover"
                          />
                          {item?.name}
                        </div>
                      </TableCell>

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
                                  if (!isAuthorized("Genres", "Update")) {
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
                                  setEditData({
                                    id: item?._id,
                                    name: item?.name,
                                    genreIcon: item?.genreIconUrl,
                                  });
                                }}
                                className="my-1.5"
                              >
                                <Edit3 className=" size-4" />{" "}
                                <span className="ms-1">Edit</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  if (!isAuthorized("Genres", "Delete")) {
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
              <PaginationComponent
                currentPage={
                  params.get("page") ? Number(params.get("page")) : 1
                }
                totalPages={
                  data?.count && Number(params.get("limit")) > 0
                    ? Math.ceil(data.count / Number(params.get("limit")))
                    : 1
                }
                isLoading={gettingGenres}
                onPageChange={handlePageChange}
                handleLimitChange={handleLimitChange}
              />
            </>
          )}
        </>
      </div>

      <AddGenreBox ref={ref} />
      <EditGenreBox
        ref={editRef}
        editData={editData}
        setEditData={setEditData}
      />
      <ConfirmDelete
        ref={deleteRef}
        cancel={() => setDeleteId(null)}
        run={() => deleteGenre(deleteId as string)}
      />
    </section>
  );
};

export default GenrePage;
