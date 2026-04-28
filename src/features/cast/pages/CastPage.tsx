import { Button } from "@/components/ui/button";
import { Edit3, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import useCast from "../hooks/useCast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeletonLoader from "@/components/TableSkeleton";
import AddCastBox from "../components/AddCastBox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import ConfirmDelete from "@/components/ConfirmDelete";
import EditCastBox from "../components/EditCastBox";
import { useProfile } from "@/features/auth/hooks/useProfile";
import { toast } from "sonner";
import usePagination from "@/hooks/usePagination";
import { PaginationComponent } from "@/components/Pagination";
import { useSearchParams } from "react-router-dom";

const CastPage = () => {
  const { isAuthorized } = useProfile();
  const [params] = useSearchParams();

  const { toggleSortBy, toggleSortOrder, handleLimitChange, handlePageChange } =
    usePagination();

  const ref = useRef<HTMLButtonElement | null>(null);
  const editRef = useRef<HTMLButtonElement | null>(null);
  const deleteRef = useRef<HTMLButtonElement | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  interface CastData {
    id: string;
    name: string;
    profilePicture: string;
    role: string;
    roleId: string;
  }

  const [editData, setEditData] = useState<CastData | null>(null);

  const { data, gettingCasts, deleteCast } = useCast();

  return (
    <section>
      <div className=" flex justify-between items-center">
        <p className=" text-xl font-semibold">Casts List</p>
        <Button
          onClick={() => {
            if (!isAuthorized("Cast", "Create")) {
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
          Add New Cast
        </Button>
      </div>

      <div className=" mt-4">
        <>
          {gettingCasts ? (
            <TableSkeletonLoader />
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow className=" !bg-transparent">
                    <TableHead>#</TableHead>
                    <TableHead
                      onClick={() => {
                        toggleSortBy("name");
                        toggleSortOrder();
                      }}
                    >
                      <span className="flex gap-4 items-center cursor-pointer">
                        Cast
                        <span>
                          <Icon className=" h-3" icon={"mdi:chevron-up"} />
                          <Icon className=" h-3" icon={"mdi:chevron-down"} />
                        </span>
                      </span>
                    </TableHead>
                    <TableHead>Role</TableHead>
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
                      <TableCell>
                        <div className=" flex items-center gap-3">
                          <img
                            src={item?.profilePictureUrl}
                            alt=""
                            className=" size-12 rounded-lg object-cover"
                          />
                          {item?.name}
                        </div>
                      </TableCell>

                      <TableCell>{item?.role?.role}</TableCell>
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
                                  if (!isAuthorized("Cast", "Update")) {
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
                                    profilePicture: item?.profilePictureUrl,
                                    role: item?.role?.role || "",
                                    roleId: item?.role?._id || "",
                                  });
                                }}
                                className="my-1.5"
                              >
                                <Edit3 className=" size-4" />{" "}
                                <span className="ms-1">Edit</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  if (!isAuthorized("Cast", "Delete")) {
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
                isLoading={gettingCasts}
                onPageChange={handlePageChange}
                handleLimitChange={handleLimitChange}
              />
            </>
          )}
        </>
      </div>
      <AddCastBox ref={ref} />
      <EditCastBox
        ref={editRef}
        editData={editData}
        setEditData={setEditData}
      />
      <ConfirmDelete
        ref={deleteRef}
        cancel={() => setDeleteId(null)}
        run={() => deleteCast(deleteId as string)}
      />
    </section>
  );
};

export default CastPage;
