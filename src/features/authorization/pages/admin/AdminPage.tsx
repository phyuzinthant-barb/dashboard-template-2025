import { Button } from "@/components/ui/button";
import { Edit3, Eye, Plus, Trash2 } from "lucide-react";
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
import { useNavigate, useSearchParams } from "react-router-dom";
import { AdminDetail } from "../../types";
import useAdmin from "../../hooks/useAdmin";
import AdminDetailBox from "../../components/admin/AdminDetail";
import { useProfile } from "@/features/auth/hooks/useProfile";
import { toast } from "sonner";
import UnAuthorizedComponent from "@/components/UnAuthorizedComponent";
import usePagination from "@/hooks/usePagination";
import { PaginationComponent } from "@/components/Pagination";

const AdminPage = () => {
  const { isAuthorized } = useProfile();
  const [params] = useSearchParams();

  const { toggleSortBy, toggleSortOrder, handleLimitChange, handlePageChange } =
    usePagination();

  const nav = useNavigate();

  const detailRef = useRef<HTMLButtonElement | null>(null);
  const deleteRef = useRef<HTMLButtonElement | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [detailData, setDetailData] = useState<AdminDetail | null>(null);

  const { data, gettingAdmins, deleteAdmin } = useAdmin();

  return (
    <>
      {isAuthorized("Admins", "Read") ? (
        <section>
          <div className=" flex justify-between items-center">
            <p className=" text-xl font-semibold">Admins List</p>
            <Button
              onClick={() => {
                if (!isAuthorized("Admins", "Create")) {
                  toast.error(
                    "You are not authorized to add content related to Admins",
                    {
                      position: "top-center",
                      className: "!bg-red-400 !text-white",
                    }
                  );
                  return;
                }
                nav("/admin-list/add");
              }}
              size={"lg"}
              className=" h-12 px-4"
            >
              <Plus className=" me-3" />
              Add New Admin
            </Button>
          </div>

          <div className=" mt-4">
            <>
              {gettingAdmins ? (
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
                            Name
                            <span>
                              <Icon className=" h-3" icon={"mdi:chevron-up"} />
                              <Icon
                                className=" h-3"
                                icon={"mdi:chevron-down"}
                              />
                            </span>
                          </span>
                        </TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
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
                          <TableCell className=" w-[50px]">
                            {index + 1}.
                          </TableCell>
                          <TableCell>
                            <div className=" flex items-center gap-3">
                              <img
                                src={item?.profilePictureUrl}
                                alt=""
                                className=" object-top size-12 rounded-lg object-cover"
                              />
                              {item?.name}
                            </div>
                          </TableCell>

                          <TableCell className=" lowercase">
                            {item?.email}
                          </TableCell>

                          <TableCell>{item?.phone}</TableCell>

                          <TableCell>{item?.role?.title}</TableCell>

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
                                      detailRef?.current?.click();
                                      setDetailData({
                                        profilePictureUrl:
                                          item?.profilePictureUrl,
                                        name: item?.name,
                                        phone: item?.phone,
                                        email: item?.email,
                                        role: item?.role?.title,
                                      });
                                    }}
                                    className="my-1.5"
                                  >
                                    <Eye className=" size-4" />{" "}
                                    <span className="ms-1">View</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      if (!isAuthorized("Admins", "Update")) {
                                        toast.error(
                                          "You are not authorized to update content related to Admins",
                                          {
                                            position: "top-center",
                                            className:
                                              "!bg-red-400 !text-white",
                                          }
                                        );
                                        return;
                                      }
                                      nav(`/admin-list/edit/${item?._id}`);
                                    }}
                                    className="my-1.5"
                                  >
                                    <Edit3 className=" size-4" />{" "}
                                    <span className="ms-1">Edit</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      if (!isAuthorized("Admins", "Delete")) {
                                        toast.error(
                                          "You are not authorized to delete content related to Admins",
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
                    isLoading={gettingAdmins}
                    onPageChange={handlePageChange}
                    handleLimitChange={handleLimitChange}
                  />
                </>
              )}
            </>
          </div>

          <AdminDetailBox
            ref={detailRef}
            data={detailData}
            setData={setDetailData}
          />

          <ConfirmDelete
            ref={deleteRef}
            cancel={() => setDeleteId(null)}
            run={() => deleteAdmin(deleteId as string)}
          />
        </section>
      ) : (
        <UnAuthorizedComponent />
      )}
    </>
  );
};

export default AdminPage;
