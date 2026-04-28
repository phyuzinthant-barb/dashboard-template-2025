import { Button } from "@/components/ui/button";
import { Edit3, Eye, Plus, Trash2 } from "lucide-react";
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
import usePackage from "../hooks/usePackage";
import AddPackageBox from "../components/AddPackageBox";
import TogglePublishBox from "../components/TogglePublishBox";
import EditPackageBox from "../components/EditPackageBox";
import PackageDetailBox from "../components/PackageDetail";
import { PackageDetail } from "../types";
import { useProfile } from "@/features/auth/hooks/useProfile";
import UnAuthorizedComponent from "@/components/UnAuthorizedComponent";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import { PaginationComponent } from "@/components/Pagination";
import usePagination from "@/hooks/usePagination";
import SearchBar from "@/components/SearchBar";
import FilterPackages from "../FilterPackages";

type Status = {
  id: string;
  status: string;
};

type Package = {
  id: string;
  duration: number;
  price: number;
  description: string;
  name: string;
};

const PackagesPage = () => {
  const [params] = useSearchParams();

  const { isAuthorized } = useProfile();

  const { data, gettingPackages, deletePackage } = usePackage();

  const { toggleSortBy, toggleSortOrder, handleLimitChange, handlePageChange } =
    usePagination();

  const [editData, setEditData] = useState<Package | null>(null);
  const [detailData, setDetailData] = useState<PackageDetail | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const editRef = useRef<HTMLButtonElement | null>(null);
  const deleteRef = useRef<HTMLButtonElement | null>(null);
  const addRef = useRef<HTMLButtonElement | null>(null);
  const detailRef = useRef<HTMLButtonElement | null>(null);

  const togglePublishRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div>
      {isAuthorized("Packages", "Read") ? (
        <div>
          <div className="flex w-full mb-4 justify-between">
            <div className="flex flex-col gap-3">
              <p className="font-bold text-xl ">Packages list</p>
              <div className="font-medium flex text-dark/60 items-center gap-2">
                <p className="font-medium dark:text-white text-base">
                  Total Packages:
                </p>
                <p className="bg-white rounded border-input border text-base font-mono px-2 py-0.5">
                  {data?.count}
                </p>
                <p className="font-medium text-base">Packages</p>
              </div>
              <SearchBar title="Search Packages" />
            </div>

            <Button
              onClick={() => {
                if (!isAuthorized("Packages", "Create")) {
                  toast.error("You are not authorized to add packages!", {
                    position: "top-center",
                    className: "!bg-red-400 !text-white",
                  });
                  return;
                }
                addRef?.current?.click();
              }}
              className=" h-12 px-4"
              size={"lg"}
            >
              <Plus /> <span className=" ms-1">Add New Packages</span>
            </Button>
          </div>

          <FilterPackages />

          <div className=" mt-4">
            <>
              {gettingPackages ? (
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
                              <Icon
                                className=" h-3"
                                icon={"mdi:chevron-down"}
                              />
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
                            Plan Name
                            <span>
                              <Icon className=" h-3" icon={"mdi:chevron-up"} />
                              <Icon
                                className=" h-3"
                                icon={"mdi:chevron-down"}
                              />
                            </span>
                          </span>
                        </TableHead>
                        <TableHead>Pricing</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Most Popular</TableHead>
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
                            {index + 1}.
                          </TableCell>
                          <TableCell className=" w-[150px]">
                            {formatDate(
                              new Date(item?.createdAt),
                              "dd MMM yyyy"
                            )}
                          </TableCell>
                          <TableCell>{item?.name}</TableCell>
                          <TableCell>{item?.price}</TableCell>
                          <TableCell>{item?.duration}</TableCell>
                          <TableCell>
                            {item?.status ? "Published" : "Unpublished"}
                          </TableCell>
                          <TableCell>
                            {item?.isPopular ? "Yes" : "No"}
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
                              <DropdownMenuContent className="w-40 me-1">
                                <DropdownMenuGroup>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      detailRef?.current?.click();
                                      setDetailData({
                                        name: item.name,
                                        description: item.description,
                                        price: item.price,
                                        duration: item.duration,
                                      });
                                    }}
                                    className="my-1.5"
                                  >
                                    <Eye className=" size-4" />
                                    <span className="ms-1">View</span>
                                  </DropdownMenuItem>

                                  <DropdownMenuItem
                                    onClick={() => {
                                      if (!isAuthorized("Packages", "Update")) {
                                        toast.error(
                                          "You are not authorized to update packages!",
                                          {
                                            position: "top-center",
                                            className:
                                              "!bg-red-400 !text-white",
                                          }
                                        );
                                        return;
                                      }
                                      editRef?.current?.click();
                                      setEditData({
                                        id: item._id,
                                        duration: item.duration,
                                        price: item.price,
                                        description: item.description,
                                        name: item.name,
                                      });
                                    }}
                                    className="my-1.5"
                                  >
                                    <Edit3 className=" size-4" />
                                    <span className="ms-1">Edit</span>
                                  </DropdownMenuItem>

                                  <DropdownMenuItem
                                    onClick={() => {
                                      if (!isAuthorized("Packages", "update")) {
                                        toast.error(
                                          "You are not authorized to update packages!",
                                          {
                                            position: "top-center",
                                            className:
                                              "!bg-red-400 !text-white",
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
                                        item?.status
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
                                      if (!isAuthorized("Packages", "Delete")) {
                                        toast.error(
                                          "You are not authorized to delete packages!",
                                          {
                                            position: "top-center",
                                            className:
                                              "!bg-red-400 !text-white",
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
                    totalPages={data?.totalPages}
                    isLoading={gettingPackages}
                    onPageChange={handlePageChange}
                    handleLimitChange={handleLimitChange}
                  />
                </>
              )}
            </>
          </div>

          <PackageDetailBox
            ref={detailRef}
            data={detailData}
            setData={setDetailData}
          />
          <AddPackageBox ref={addRef} />

          <EditPackageBox
            ref={editRef}
            setEditData={setEditData}
            editData={editData}
          />

          <TogglePublishBox
            ref={togglePublishRef}
            setEditData={setStatus}
            editData={status}
          />

          <ConfirmDelete
            ref={deleteRef}
            cancel={() => setDeleteId(null)}
            run={() => deletePackage(deleteId as string)}
          />
        </div>
      ) : (
        <UnAuthorizedComponent />
      )}
    </div>
  );
};

export default PackagesPage;
