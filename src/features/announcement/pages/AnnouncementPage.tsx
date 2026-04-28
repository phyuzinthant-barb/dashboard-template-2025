import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import useAnnouncement from "../hooks/useAnnouncement";
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
import ConfirmDelete from "@/components/ConfirmDelete";
import { formatDate } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Edit3, Eye, Plus, Trash2 } from "lucide-react";
import { Icon } from "@iconify/react";
import AnnouncementDetailBox from "../components/AnnouncementDetail";
import { AnnouncementDetail } from "../types";
import { useProfile } from "@/features/auth/hooks/useProfile";
import { toast } from "sonner";

const AnnouncementPage = () => {
  const nav = useNavigate();
  const { isAuthorized } = useProfile();
  const { data, gettingAnnouncement, deleteAnnouncement } = useAnnouncement();

  const deleteRef = useRef<HTMLButtonElement | null>(null);
  const detailRef = useRef<HTMLButtonElement | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [detail, setDetail] = useState<AnnouncementDetail | null>(null);

  return (
    <section>
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-3">
          <p className="font-bold text-xl ">Announcement</p>
          <div className="font-medium flex text-dark/60 items-center gap-2">
            <p className="font-medium dark:text-white text-base">
              Total announcements:
            </p>
            <p className="bg-white rounded border-input border text-base font-mono px-2 py-0.5">
              {data?.count}
            </p>
          </div>
        </div>

        <Button
          onClick={() => {
            if (!isAuthorized("Announcements", "Create")) {
              toast.error("You are not authorized to  announce!", {
                position: "top-center",
                className: "!bg-red-400 !text-white",
              });
              return;
            }
            nav("/announcement/add");
          }}
          className=" h-12 px-4"
          size={"lg"}
        >
          <Plus /> <span className=" ms-1">New Announcement</span>
        </Button>
      </div>
      <div className=" mt-4">
        <>
          {gettingAnnouncement ? (
            <TableSkeletonLoader />
          ) : (
            <>
              <Table>
                <TableHeader className=" select-none">
                  <TableRow className=" !bg-transparent">
                    <TableHead>#</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data?.data?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
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
                      <TableCell className=" w-[350px]">
                        <div className=" w-full line-clamp-2">
                          {item?.title}
                        </div>
                      </TableCell>
                      <TableCell className=" w-[450px]">
                        <div className=" w-full line-clamp-2">{item?.body}</div>
                      </TableCell>
                      <TableCell className=" w-[250px]">
                        {item?.scheduleAt
                          ? formatDate(
                              new Date(item?.scheduleAt),
                              "dd MMM yyyy, HH:mm"
                            )
                          : "-"}
                      </TableCell>
                      <TableCell>{item?.plan}</TableCell>
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
                                  setDetail({
                                    title: item.title,
                                    body: item.body,
                                    image: item.imageUrl,
                                  });
                                  detailRef?.current?.click();
                                }}
                                className="my-1.5"
                              >
                                <Eye className=" size-4" />
                                <span className="ms-1">View</span>
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() => {
                                  if (
                                    !isAuthorized("Announcements", "Update")
                                  ) {
                                    toast.error(
                                      "You are not authorized to update content related to announcement!",
                                      {
                                        position: "top-center",
                                        className: "!bg-red-400 !text-white",
                                      }
                                    );
                                    return;
                                  }
                                  nav(`/announcement/edit/${item?._id}`);
                                }}
                                className="my-1.5"
                              >
                                <Edit3 className=" size-4" />
                                <span className="ms-1">Edit</span>
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() => {
                                  if (
                                    !isAuthorized("Announcements", "Delete")
                                  ) {
                                    toast.error(
                                      "You are not authorized to delete content related to announcement!",
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

      <ConfirmDelete
        ref={deleteRef}
        cancel={() => setDeleteId(null)}
        run={() => deleteAnnouncement(deleteId as string)}
      />

      <AnnouncementDetailBox
        ref={detailRef}
        data={detail}
        setData={setDetail}
      />
    </section>
  );
};

export default AnnouncementPage;
