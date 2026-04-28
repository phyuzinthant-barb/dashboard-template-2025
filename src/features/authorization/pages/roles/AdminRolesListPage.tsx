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
import { useNavigate } from "react-router-dom";
import useAdminRoles from "../../hooks/useAdminRoles";
import { useProfile } from "@/features/auth/hooks/useProfile";
import UnAuthorizedComponent from "@/components/UnAuthorizedComponent";
import { toast } from "sonner";

const AdminRoleListPage = () => {
  const { isAuthorized } = useProfile();

  const nav = useNavigate();

  const detailRef = useRef<HTMLButtonElement | null>(null);
  const deleteRef = useRef<HTMLButtonElement | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, gettingRoles, deleteRoles } = useAdminRoles();

  return (
    <>
      {isAuthorized("Admins", "Read") ? (
        <section>
          <div className=" flex justify-between items-center">
            <p className=" text-xl font-semibold">Roles List</p>
            <Button
              onClick={() => nav("/admin/roles/add")}
              size={"lg"}
              className=" h-12 px-4"
            >
              <Plus className=" me-3" />
              Add New Role
            </Button>
          </div>

          <div className=" mt-4">
            <>
              {gettingRoles ? (
                <TableSkeletonLoader />
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow className=" !bg-transparent">
                        <TableHead>#</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {data?.data?.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center">
                            There is no data yet?
                          </TableCell>
                        </TableRow>
                      )}

                      {data?.data?.map((item: any, index: number) => (
                        <TableRow key={item._id}>
                          <TableCell className=" w-[50px]">
                            {index + 1}.
                          </TableCell>
                          <TableCell>{item?.title}</TableCell>

                          <TableCell className=" lowercase">
                            {item?.description}
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
                                      detailRef?.current?.click();
                                      nav(`/admin/roles/detail/${item?._id}`);
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
                                          "You are not authorized to add roles!",
                                          {
                                            position: "top-center",
                                            className:
                                              "!bg-red-400 !text-white",
                                          }
                                        );
                                        return;
                                      }
                                      nav(`/admin/roles/edit/${item?._id}`);
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
                                          "You are not authorized to delete roles!",
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
                </>
              )}
            </>
          </div>

          <ConfirmDelete
            ref={deleteRef}
            cancel={() => setDeleteId(null)}
            run={() => deleteRoles(deleteId as string)}
          />
        </section>
      ) : (
        <UnAuthorizedComponent />
      )}
    </>
  );
};

export default AdminRoleListPage;
