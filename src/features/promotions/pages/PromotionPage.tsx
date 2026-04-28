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
import usePromotion from "../hooks/usePromotion";
import TogglePublishBox from "../components/TogglePublishBox";
import AddPromotionBox from "../components/AddPromotionBox";
import EditPromotionBox from "../components/EditPromotionBox";
import { PromotionDetail } from "../types";
import PromotionDetailBox from "../components/PromotionDetail";
import { toast } from "sonner";
import { useProfile } from "@/features/auth/hooks/useProfile";
import FilterPackages from "@/features/packages/FilterPackages";
import SearchBar from "@/components/SearchBar";

type Status = {
  id: string;
  status: string;
};

type Promotion = {
  id: string;
  name: string;
  discount: number;
  price: number;
  plan: string;
  startDate: string;
  endDate: string;
};

const PromotionPage = () => {
  const { isAuthorized } = useProfile();

  const {
    data,
    gettingPromotions,
    deletePromotion,
    // toggleSortBy,
    // toggleSortOrder,
  } = usePromotion();

  const [editData, setEditData] = useState<Promotion | null>(null);
  const [detailData, setDetailData] = useState<PromotionDetail | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const addRef = useRef<HTMLButtonElement | null>(null);
  const editRef = useRef<HTMLButtonElement | null>(null);
  const detailRef = useRef<HTMLButtonElement | null>(null);
  const deleteRef = useRef<HTMLButtonElement | null>(null);

  const togglePublishRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div>
      <div className="flex w-full mb-4 justify-between">
        <div className="flex flex-col gap-3">
          <p className="font-bold text-xl ">Promotions List</p>
          <div className="font-medium flex text-dark/60 items-center gap-2">
            <p className="font-medium dark:text-white text-base">
              Total Promotions:
            </p>
            <p className="bg-white rounded border-input border text-base font-mono px-2 py-0.5">
              {data?.count}
            </p>
            <p className="font-medium text-base">Promotions</p>
          </div>
          <SearchBar title="Search Promotions" />
        </div>

        <Button
          onClick={() => {
            if (!isAuthorized("Promotions", "Create")) {
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
          <Plus /> <span className=" ms-1">Add New Promotions</span>
        </Button>
      </div>

      <FilterPackages />

      <div className=" mt-4">
        <>
          {gettingPromotions ? (
            <TableSkeletonLoader />
          ) : (
            <>
              <Table>
                <TableHeader className=" select-none">
                  <TableRow className=" !bg-transparent">
                    <TableHead>#</TableHead>
                    <TableHead
                    // onClick={() => {
                    //   toggleSortBy("createdAt");
                    //   toggleSortOrder();
                    // }}
                    >
                      <span className="flex gap-4 items-center cursor-pointer">
                        Date
                        {/* <span>
                          <Icon className=" h-3" icon={"mdi:chevron-up"} />
                          <Icon className=" h-3" icon={"mdi:chevron-down"} />
                        </span> */}
                      </span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Plan Name</TableHead>
                    <TableHead>Period</TableHead>
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
                      <TableCell className=" w-[50px]">{index + 1}.</TableCell>

                      <TableCell className=" w-[150px]">
                        {formatDate(new Date(item?.createdAt), "dd MMM yyyy")}
                      </TableCell>

                      <TableCell>{item?.name}</TableCell>

                      <TableCell>{item?.plan?.name}</TableCell>

                      <TableCell>
                        {formatDate(new Date(item?.startDate), "MMM, dd, yyyy")}{" "}
                        - {formatDate(new Date(item?.endDate), "MMM, dd, yyyy")}
                      </TableCell>

                      <TableCell>
                        {item?.status ? "Published" : "Unpublished"}
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
                                    plan: item?.plan?.name,
                                    discount: item?.discount,
                                    startDate: item?.startDate,
                                    endDate: item?.endDate,
                                  });
                                }}
                                className="my-1.5"
                              >
                                <Eye className=" size-4" />
                                <span className="ms-1">View</span>
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() => {
                                  if (!isAuthorized("Promotions", "Update")) {
                                    toast.error(
                                      "You are not authorized to update packages!",
                                      {
                                        position: "top-center",
                                        className: "!bg-red-400 !text-white",
                                      }
                                    );
                                    return;
                                  }
                                  editRef?.current?.click();
                                  setEditData({
                                    id: item._id,
                                    name: item.name,
                                    discount: item.discount,
                                    price: item.price,
                                    plan: item.plan._id,
                                    startDate: item.startDate,
                                    endDate: item.endDate,
                                  });
                                }}
                                className="my-1.5"
                              >
                                <Edit3 className=" size-4" />
                                <span className="ms-1">Edit</span>
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() => {
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
                                  if (!isAuthorized("Promotions", "Delete")) {
                                    toast.error(
                                      "You are not authorized to delete packages!",
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

      <PromotionDetailBox
        ref={detailRef}
        data={detailData}
        setData={setDetailData}
      />

      <AddPromotionBox ref={addRef} />

      <TogglePublishBox
        ref={togglePublishRef}
        setEditData={setStatus}
        editData={status}
      />

      <EditPromotionBox
        ref={editRef}
        setEditData={setEditData}
        editData={editData}
      />

      <ConfirmDelete
        ref={deleteRef}
        cancel={() => setDeleteId(null)}
        run={() => deletePromotion(deleteId as string)}
      />
    </div>
  );
};

export default PromotionPage;
