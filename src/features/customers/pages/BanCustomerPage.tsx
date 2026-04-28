import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
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
import { formatDate } from "date-fns";
import useCustomers from "../hooks/useCustomer";
import { useProfile } from "@/features/auth/hooks/useProfile";
import UnAuthorizedComponent from "@/components/UnAuthorizedComponent";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import { PaginationComponent } from "@/components/Pagination";
import usePagination from "@/hooks/usePagination";
import SearchBar from "@/components/SearchBar";
import FilterCustomers from "../FilterCustomers";
import { CustomersDetail } from "../types";
import CustomersDetailBox from "../components/CustomerDetail";
import BanCustomerBox from "../components/BanCustomers";
import { useCustomersQuery } from "../services/customerServices";

const BanCustomerPage = () => {
  const [params] = useSearchParams();

  const { isAuthorized } = useProfile();

  const { banCustomers } = useCustomers();

  const { data, isLoading: gettingCustomers } = useCustomersQuery({
    param: `isBanned=true`,
  });

  const { toggleSortBy, toggleSortOrder, handleLimitChange, handlePageChange } =
    usePagination();

  const [detailData, setDetailData] = useState<CustomersDetail | null>(null);
  const [banId, setBanId] = useState<string | null>(null);

  const banRef = useRef<HTMLButtonElement | null>(null);
  const detailRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div>
      {isAuthorized("Customers", "Read") ? (
        <div>
          <div className="flex w-full mb-4 justify-between">
            <div className="flex flex-col gap-3">
              <p className="font-bold text-xl">Banned Customers list</p>
              <div className="font-medium flex text-dark/60 items-center gap-2">
                <p className="font-medium dark:text-white text-base">
                  Total Banned Customers:
                </p>
                <p className="bg-white rounded border-input border text-base font-mono px-2 py-0.5">
                  {data?.count}
                </p>
                <p className="font-medium text-base">Customers</p>
              </div>
              <SearchBar title="Search Customers" />
            </div>
          </div>
          <FilterCustomers />
          <div className=" mt-4">
            <>
              {gettingCustomers ? (
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
                        <TableHead>Phone</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Package</TableHead>
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
                            {index + 1}.
                          </TableCell>
                          <TableCell className=" w-[150px]">
                            {formatDate(
                              new Date(item?.createdAt),
                              "dd MMM yyyy"
                            )}
                          </TableCell>
                          <TableCell>{item?.name}</TableCell>
                          <TableCell>{item?.phone}</TableCell>
                          <TableCell>{item?.email}</TableCell>
                          <TableCell>{item?.package?.name}</TableCell>
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
                                      detailRef?.current?.click();
                                      setDetailData({
                                        name: item.name,
                                        email: item.email,
                                        phone: item.phone,
                                        package: item.package?.name,
                                        profilePictureUrl:
                                          item.profilePictureUrl,
                                      });
                                    }}
                                    className="my-1.5"
                                  >
                                    <Eye className=" size-4" />
                                    <span className="ms-1">View</span>
                                  </DropdownMenuItem>

                                  <DropdownMenuItem
                                    onClick={() => {
                                      if (
                                        !isAuthorized("Customers", "update")
                                      ) {
                                        toast.error(
                                          "You are not authorized to update Customers!",
                                          {
                                            position: "top-center",
                                            className:
                                              "!bg-red-400 !text-white",
                                          }
                                        );
                                        return;
                                      } else {
                                        setBanId(item._id);
                                        banRef?.current?.click();
                                      }
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
                                    <span className="ms-1">Unban</span>
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
                      data?.totalPages
                    }
                    isLoading={gettingCustomers}
                    onPageChange={handlePageChange}
                    handleLimitChange={handleLimitChange}
                  />
                </>
              )}
            </>
          </div>

          <CustomersDetailBox
            data={detailData}
            setData={setDetailData}
            ref={detailRef}
          />

          <BanCustomerBox
            ref={banRef}
            ban={false}
            cancel={() => setBanId(null)}
            run={() => banCustomers(banId as string)}
          />
        </div>
      ) : (
        <UnAuthorizedComponent />
      )}
    </div>
  );
};

export default BanCustomerPage;
