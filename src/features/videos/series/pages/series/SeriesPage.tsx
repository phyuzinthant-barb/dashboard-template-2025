import { Button } from "@/components/ui/button";
import { Edit3, Eye, Plus, Trash2 } from "lucide-react";
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
import React, { useRef, useState } from "react";
import ConfirmDelete from "@/components/ConfirmDelete";
import { formatDate } from "date-fns";
import EditPlanBox from "../../components/series/ChangePlanBox";
import TogglePublishBox from "../../components/series/TogglePublishBox";
import useSeries from "../../hooks/useSeries";
import SeasonRow from "../season/SeasonRow";
import { useProfile } from "@/features/auth/hooks/useProfile";
import { toast } from "sonner";
import SearchBar from "@/components/SearchBar";
import FilterSeries from "../../components/FilterSeries";
import { PaginationComponent } from "@/components/Pagination";
import usePagination from "@/hooks/usePagination";

type SeriesPlan = {
  id: string;
  plan: string;
};

type Status = {
  id: string;
  status: string;
};

const SeriesPage = () => {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const { isAuthorized } = useProfile();

  const { toggleSortBy, toggleSortOrder, handleLimitChange, handlePageChange } =
    usePagination();

  const { data, gettingSeries, deleteSeries } = useSeries();

  const [plan, setPlan] = useState<SeriesPlan | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const deleteRef = useRef<HTMLButtonElement | null>(null);
  const togglePublishRef = useRef<HTMLButtonElement | null>(null);
  const changePlan = useRef<HTMLButtonElement | null>(null);

  return (
    <div>
      <div className="flex w-full mb-4 justify-between">
        <div className="flex flex-col gap-3">
          <p className="font-bold text-xl ">Series List</p>
          <div className="font-medium flex text-dark/60 items-center gap-2">
            <p className="font-medium dark:text-white text-base">
              Total Series:
            </p>
            <p className="bg-white rounded border-input border text-base font-mono px-2 py-0.5">
              {data?.count}
            </p>
            <p className="font-medium text-base">Series</p>
          </div>
          <SearchBar title="Search Series" />
        </div>

        <Button
          onClick={() => {
            if (!isAuthorized("Series", "Create")) {
              toast.error("You are not authorized to add series", {
                position: "top-center",
                className: "!bg-red-400 !text-white",
              });
              return;
            }
            nav("/video-list/series/add");
          }}
          className=" h-12 px-4"
          size={"lg"}
        >
          <Plus /> <span className=" ms-1">Add New Series</span>
        </Button>
      </div>

      <FilterSeries />

      <div className=" mt-4">
        <>
          {gettingSeries ? (
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
                    <TableHead className=" w-[200px]">Category</TableHead>
                    <TableHead className=" w-[300px]">Season</TableHead>
                    <TableHead className=" w-[200px]">Status</TableHead>
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
                    <React.Fragment key={index}>
                      <TableRow>
                        <TableCell className=" w-[50px]">
                          {index + 1}.
                        </TableCell>
                        <TableCell className=" w-[150px]">
                          {formatDate(new Date(item?.createdAt), "dd MMM yyyy")}
                        </TableCell>
                        <TableCell
                          className=" cursor-pointer"
                          onClick={() => {
                            setOpenId(openId == item?.id ? null : item?.id);
                          }}
                        >
                          <span className=" cursor-pointer flex items-center gap-2">
                            <Icon
                              icon={"tabler:arrow-forward"}
                              className=" "
                              width={28}
                              height={28}
                            />
                            <span className=" w-full line-clamp-1 ">
                              {item?.name}
                            </span>
                          </span>
                        </TableCell>
                        <TableCell>{item?.category?.name}</TableCell>
                        <TableCell></TableCell>
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
                                  onClick={() => {
                                    if (!isAuthorized("Season", "Create")) {
                                      toast.error(
                                        "You are not authorized to add series",
                                        {
                                          position: "top-center",
                                          className: "!bg-red-400 !text-white",
                                        }
                                      );
                                      return;
                                    }
                                    nav(
                                      `/video-list/series/season/add/${item._id}`
                                    );
                                  }}
                                  className="my-1.5"
                                >
                                  <Plus className=" size-4" />
                                  <span className="ms-1">Add Season</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                  onClick={() =>
                                    nav(`/video-list/series/detail/${item._id}`)
                                  }
                                  className="my-1.5"
                                >
                                  <Eye className=" size-4" />
                                  <span className="ms-1">View</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                  onClick={() => {
                                    if (!isAuthorized("Series", "Update")) {
                                      toast.error(
                                        "You are not authorized to update series",
                                        {
                                          position: "top-center",
                                          className: "!bg-red-400 !text-white",
                                        }
                                      );
                                      return;
                                    }
                                    nav(`/video-list/series/edit/${item._id}`);
                                  }}
                                  className="my-1.5"
                                >
                                  <Edit3 className=" size-4" />
                                  <span className="ms-1">Edit</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                  onClick={() => {
                                    if (!isAuthorized("Series", "Update")) {
                                      toast.error(
                                        "You are not authorized to update series",
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
                                    if (!isAuthorized("Series", "Update")) {
                                      toast.error(
                                        "You are not authorized to update series",
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
                                    if (!isAuthorized("Series", "Delete")) {
                                      toast.error(
                                        "You are not authorized to delete series",
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
                      {openId == item?.id && <SeasonRow item={item} />}
                    </React.Fragment>
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
                isLoading={gettingSeries}
                onPageChange={handlePageChange}
                handleLimitChange={handleLimitChange}
              />
            </>
          )}
        </>
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
        run={() => deleteSeries(deleteId as string)}
      />
    </div>
  );
};

export default SeriesPage;
