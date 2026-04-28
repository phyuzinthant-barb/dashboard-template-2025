import { Button } from "@/components/ui/button";
import { Edit3, Eye, Plus, Trash2 } from "lucide-react";
import useMovie from "../hooks/useMovie";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { useRef, useState } from "react";
import ConfirmDelete from "@/components/ConfirmDelete";
import { formatDate } from "date-fns";
import EditPlanBox from "../components/ChangePlanBox";
import TogglePublishBox from "../components/TogglePublishBox";
import { useProfile } from "@/features/auth/hooks/useProfile";
import { toast } from "sonner";
import SearchBar from "@/components/SearchBar";
import FilterMovies from "../components/FilterMovies";
import { PaginationComponent } from "@/components/Pagination";
import usePagination from "@/hooks/usePagination";

type MoviePlan = {
  id: string;
  plan: string;
};

type Status = {
  id: string;
  status: string;
};

const MoviePage = () => {
  const nav = useNavigate();
  const { isAuthorized } = useProfile();
  const [params] = useSearchParams();

  const { toggleSortBy, toggleSortOrder, handleLimitChange, handlePageChange } =
    usePagination();

  const { data, gettingMovies, deleteMovie } = useMovie();

  const [plan, setPlan] = useState<MoviePlan | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const deleteRef = useRef<HTMLButtonElement | null>(null);
  const togglePublishRef = useRef<HTMLButtonElement | null>(null);
  const changePlan = useRef<HTMLButtonElement | null>(null);

  return (
    <div>
      <div className="flex w-full mb-4 justify-between">
        <div className="flex flex-col gap-3">
          <p className="font-bold text-xl ">Movie List</p>
          <div className="font-medium flex text-dark/60 items-center gap-2">
            <p className="font-medium dark:text-white text-base">
              Total movies:
            </p>
            <p className="bg-white rounded border-input border text-base font-mono px-2 py-0.5">
              {data?.count}
            </p>
            <p className="font-medium text-base">movies</p>
          </div>
          <SearchBar title="Search Movies" />
        </div>

        <Button
          onClick={() => {
            if (!isAuthorized("Movies", "Create")) {
              toast.error("You are not authorized to add movies", {
                position: "top-center",
                className: "!bg-red-400 !text-white",
              });
              return;
            }
            nav("/video-list/movies/add");
          }}
          className=" h-12 px-4"
          size={"lg"}
        >
          <Plus /> <span className=" ms-1">Add New Movie</span>
        </Button>
      </div>

      <FilterMovies />

      <div className=" mt-4">
        {gettingMovies ? (
          <TableSkeletonLoader />
        ) : (
          <>
            <Table>
              <TableHeader className=" select-none">
                <TableRow className=" !bg-transparent">
                  <TableHead>#</TableHead>

                  <TableHead
                    onClick={() => {
                      toggleSortBy("createdAt");
                      toggleSortOrder();
                    }}
                  >
                    <span className="flex gap-4 items-center cursor-pointer">
                      Date
                      <span>
                        <Icon className=" h-3" icon={"mdi:chevron-up"} />
                        <Icon className=" h-3" icon={"mdi:chevron-down"} />
                      </span>
                    </span>
                  </TableHead>

                  <TableHead
                    onClick={() => {
                      toggleSortBy("name");
                      toggleSortOrder();
                    }}
                  >
                    <span className="flex gap-4 items-center cursor-pointer">
                      Name
                      <span>
                        <Icon className=" h-3" icon={"mdi:chevron-up"} />
                        <Icon className=" h-3" icon={"mdi:chevron-down"} />
                      </span>
                    </span>
                  </TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data?.data?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">
                      Start Adding Data :)
                    </TableCell>
                  </TableRow>
                )}
                {data?.data?.map((item: any, index: number) => (
                  <TableRow key={item._id}>
                    <TableCell className=" w-[50px]">
                      {(Number(params.get("page") || 1) - 1) *
                        Number(params.get("limit") || 10) +
                        index +
                        1}
                      .
                    </TableCell>
                    <TableCell className=" w-[150px]">
                      {formatDate(new Date(item?.createdAt), "dd MMM yyyy")}
                    </TableCell>

                    <TableCell className=" w-[350px]">
                      <div className=" w-full line-clamp-1">{item?.name}</div>
                    </TableCell>

                    <TableCell>{item?.category?.name}</TableCell>
                    <TableCell>
                      {item?.scheduleAt
                        ? formatDate(new Date(item?.scheduleAt), "dd MMM yyyy")
                        : "-"}
                    </TableCell>
                    <TableCell>{item?.plan}</TableCell>
                    <TableCell>{item?.status}</TableCell>
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
                        <DropdownMenuContent className="w-40 me-1">
                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              onClick={() =>
                                nav(`/video-list/movies/detail/${item._id}`)
                              }
                              className="my-1.5"
                            >
                              <Eye className=" size-4" />
                              <span className="ms-1">View</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => {
                                if (!isAuthorized("Movies", "Update")) {
                                  toast.error(
                                    "You are not authorized to edit movies",
                                    {
                                      position: "top-center",
                                      className: "!bg-red-400 !text-white",
                                    }
                                  );
                                  return;
                                }
                                nav(`/video-list/movies/edit/${item._id}`);
                              }}
                              className="my-1.5"
                            >
                              <Edit3 className=" size-4" />
                              <span className="ms-1">Edit</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => {
                                if (!isAuthorized("Movies", "Update")) {
                                  toast.error(
                                    "You are not authorized to edit movies",
                                    {
                                      position: "top-center",
                                      className: "!bg-red-400 !text-white",
                                    }
                                  );
                                  return;
                                }
                                setPlan({
                                  id: item?._id,
                                  plan: item?.plan,
                                });
                              }}
                              className="my-1.5"
                            >
                              <Icon
                                icon={
                                  "material-symbols:change-circle-outline-rounded"
                                }
                                className=" size-4"
                              />
                              <span className="ms-1">Change Plan</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => {
                                if (!isAuthorized("Movies", "Update")) {
                                  toast.error(
                                    "You are not authorized to edit movies",
                                    {
                                      position: "top-center",
                                      className: "!bg-red-400 !text-white",
                                    }
                                  );
                                  return;
                                }
                                setStatus({
                                  id: item?._id,
                                  status: item?.status,
                                });
                              }}
                              className="my-1.5"
                            >
                              <Icon
                                icon={
                                  item?.status == "PUBLISHED"
                                    ? "material-symbols-light:public-off-sharp"
                                    : "material-symbols-light:public"
                                }
                                className=" size-4"
                              />

                              <span className="ms-1">
                                {item?.status == "PUBLISHED"
                                  ? "Unpublish"
                                  : "Publish"}
                              </span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => {
                                if (!isAuthorized("Movies", "Delete")) {
                                  toast.error(
                                    "You are not authorized to delete movies",
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
            <div className="relative">
              <PaginationComponent
                currentPage={
                  params.get("page") ? Number(params.get("page")) : 1
                }
                totalPages={data?.totalPages}
                isLoading={gettingMovies}
                onPageChange={handlePageChange}
                handleLimitChange={handleLimitChange}
              />
            </div>
          </>
        )}
      </div>

      <EditPlanBox ref={changePlan} editData={plan} setEditData={setPlan} />

      <TogglePublishBox
        ref={togglePublishRef}
        editData={status}
        setEditData={setStatus}
      />

      <ConfirmDelete
        ref={deleteRef}
        cancel={() => setDeleteId(null)}
        run={() => deleteMovie(deleteId as string)}
      />
    </div>
  );
};

export default MoviePage;
