import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeletonLoader from "@/components/TableSkeleton";
import { PaginationComponent } from "@/components/Pagination";
import { useSearchParams } from "react-router-dom";
import usePagination from "@/hooks/usePagination";
import { useUserLogQuery } from "../services/userLogService";

const UserLogPage = () => {
  const [searchParams] = useSearchParams();

  const { data, isLoading: gettingUserLog } = useUserLogQuery({
    param: new URLSearchParams(
      Object.fromEntries(
        Array.from(searchParams.entries()).filter(([key]) => key !== "skip")
      )
    ).toString(),
  });

  const { handleLimitChange, handlePageChange } = usePagination();

  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section>
      <div className=" flex justify-between items-center">
        <p className=" text-xl font-semibold">User Logs</p>
      </div>

      <div className=" mt-4">
        <>
          {gettingUserLog ? (
            <TableSkeletonLoader />
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Login Date</TableHead>
                    <TableHead>User Agent</TableHead>{" "}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.count === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center">
                        No data yet
                      </TableCell>
                    </TableRow>
                  )}
                  {data?.data?.map((item: any, index: number) => (
                    <TableRow key={item._id}>
                      <TableCell>{index + 1}.</TableCell>
                      <TableCell>
                        {item?.user?.name} <br />
                        <span className="text-gray-500 text-sm lowercase">
                          {item?.email}
                        </span>
                      </TableCell>
                      <TableCell className=" lowercase">
                        {item?.user?.role?.title || "N/A"}
                      </TableCell>
                      <TableCell>{item?.ip || "N/A"}</TableCell>
                      <TableCell>
                        {formatDate(item?.lastLoggedInAt) || "N/A"}
                      </TableCell>
                      <TableHead>
                        {item?.useragent?.browser || "Unavailable"}
                      </TableHead>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <PaginationComponent
                currentPage={
                  searchParams.get("page")
                    ? Number(searchParams.get("page"))
                    : 1
                }
                totalPages={data?.totalPages}
                isLoading={gettingUserLog}
                onPageChange={handlePageChange}
                handleLimitChange={handleLimitChange}
              />
            </>
          )}
        </>
      </div>
    </section>
  );
};

export default UserLogPage;
