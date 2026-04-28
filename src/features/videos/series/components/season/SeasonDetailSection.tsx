import { useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "@/components/ErrorMessage";
import { getErrorMessage } from "@/utils/errorHandler";
import { useSingleSeasonQuery } from "../../services/seasonService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "date-fns";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Edit3, Eye, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import ConfirmDelete from "@/components/ConfirmDelete";
import useEpisodes from "../../hooks/useEpisode";

const SeasonDetailSection = () => {
  const { id } = useParams();

  const nav = useNavigate();

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const deleteRef = useRef<HTMLButtonElement | null>(null);
  const { deleteEpisodes } = useEpisodes();

  const { data, isLoading, error } = useSingleSeasonQuery({ id: id as string });

  return (
    <>
      {error && <ErrorMessage message={getErrorMessage(error)} />}

      {!isLoading && (
        <div className=" space-y-4">
          <div className=" bg-white rounded-xl">
            <div className=" px-4 py-3 border-b-[1.5px] border-b-blue-500 ">
              <p className=" font-semibold text-xl">Season Details</p>
            </div>

            <div className=" pt-5 p-4 space-y-6">
              <div className=" flex justify-start gap-12 items-center">
                <div className=" space-y-2">
                  <p className=" font-semibold text-dark/80 text-base">
                    Banner Photo
                  </p>
                  <img
                    src={data?.bannerImageUrl}
                    alt=""
                    className=" h-[300px] w-[405px] rounded-lg object-cover"
                  />
                </div>
              </div>

              <div className=" grid grid-cols-1 gap-4">
                <div className=" grid grid-cols-12 items-center">
                  <div className=" col-span-2 w-2/3 flex items-center justify-between">
                    <p className=" font-semibold text-dark/80 text-lg">
                      Series Name
                    </p>
                    <p>:</p>
                  </div>
                  <div className=" ms-10 text-lg col-span-10">{data?.name}</div>
                </div>

                <div className=" grid grid-cols-12 items-center">
                  <div className=" col-span-2 w-2/3 flex items-center justify-between">
                    <p className=" font-semibold text-dark/80 text-lg">
                      Season Title
                    </p>
                    <p>:</p>
                  </div>
                  <div className=" ms-10 text-lg col-span-10">{data?.name}</div>
                </div>

                <div className=" grid grid-cols-12 items-center">
                  <div className=" col-span-2 w-2/3 flex items-center justify-between">
                    <p className=" font-semibold text-dark/80 text-lg">Cast</p>
                    <p>:</p>
                  </div>
                  <div className=" ms-10 text-lg col-span-10">
                    {data?.actors?.map((el: any) => el?.cast?.name)?.join(", ")}
                    ,
                    {data?.actresses
                      ?.map((el: any) => el?.cast?.name)
                      ?.join(", ")}
                    ,
                    {data?.supports
                      ?.map((el: any) => el?.cast?.name)
                      ?.join(", ")}
                  </div>
                </div>

                <div className=" grid grid-cols-12 items-center">
                  <div className=" col-span-2 w-2/3 flex items-center justify-between">
                    <p className=" font-semibold text-dark/80 text-lg">
                      Trailer Url
                    </p>
                    <p>:</p>
                  </div>
                  <div className=" ms-10 text-lg col-span-10">
                    {data?.trailerUrl}
                  </div>
                </div>

                <div className=" grid grid-cols-12 items-center">
                  <div className=" col-span-2 w-2/3 flex items-center justify-between">
                    <p className=" font-semibold text-dark/80 text-lg">Type</p>
                    <p>:</p>
                  </div>
                  <div className=" ms-10 text-lg col-span-10">{data?.plan}</div>
                </div>

                <div className=" grid grid-cols-12 items-center">
                  <div className=" col-span-2 w-2/3 flex items-center justify-between">
                    <p className=" font-semibold text-dark/80 text-lg">
                      Description
                    </p>
                    <p>:</p>
                  </div>
                  <div className=" ms-10 text-lg col-span-10">
                    {data?.description}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" space-y-4">
            <div className="font-medium flex text-dark/60 items-center gap-2">
              <p className="font-semibold dark:text-white text-base">
                Total Episodes:
              </p>
              <p className="bg-white rounded border-input border text-base font-mono px-2 py-0.5">
                {data?.episodes?.length}
              </p>
              <p className="font-medium text-base">Episodes</p>
            </div>

            <Table>
              <TableHeader className=" select-none">
                <TableRow className=" !bg-transparent">
                  <TableHead>#</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Episode</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data?.episodes?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      Start Adding Data :)
                    </TableCell>
                  </TableRow>
                )}

                {data?.episodes?.map((item: any, index: number) => (
                  <TableRow key={item._id}>
                    <TableCell className=" w-[50px]">{index + 1}.</TableCell>
                    <TableCell className=" w-[150px]">
                      {formatDate(new Date(item?.createdAt), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell className=" w-[350px]">
                      <div className=" w-full line-clamp-1">
                        Episode {item?.sortOrder}
                      </div>
                    </TableCell>
                    <TableCell>{item?.duration} minutes</TableCell>
                    <TableCell>
                      {item?.scheduleAt
                        ? formatDate(new Date(item?.scheduleAt), "dd MMM yyyy")
                        : "-"}
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
                              onClick={() =>
                                nav(
                                  `/video-list/series/season/episode/detail/${item._id}`
                                )
                              }
                              className="my-1.5"
                            >
                              <Eye className=" size-4" />
                              <span className="ms-1">View</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() =>
                                nav(
                                  `/video-list/series/season/episode/edit/${item._id}`
                                )
                              }
                              className="my-1.5"
                            >
                              <Edit3 className=" size-4" />
                              <span className="ms-1">Edit</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => {
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
          </div>
        </div>
      )}

      <ConfirmDelete
        ref={deleteRef}
        cancel={() => setDeleteId(null)}
        run={() => deleteEpisodes(deleteId as string)}
      />
    </>
  );
};

export default SeasonDetailSection;
