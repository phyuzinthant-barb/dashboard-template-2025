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
import { useAuditLogQuery } from "../services/auditService";

const AuditLogPage = () => {
  const [searchParams] = useSearchParams();

  const { data, isLoading: gettingAuditLog } = useAuditLogQuery({
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
        <p className=" text-xl font-semibold">Audit Logs</p>
      </div>

      <div className=" mt-4">
        <>
          {gettingAuditLog ? (
            <TableSkeletonLoader />
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Date Time</TableHead>
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
                      <TableCell className=" w-[350px]">
                        {item?.action} {item?.module}
                      </TableCell>
                      <TableCell className=" ">
                        {item?.user?.name} <br />
                        <span className="text-gray-500 text-sm lowercase">
                          {item?.user?.email}
                        </span>
                      </TableCell>
                      <TableCell>{item?.ip || "Unknown"}</TableCell>
                      <TableCell>{item?.action}</TableCell>

                      <TableCell>
                        {item?.useragent?.platform || "Unknown"}
                      </TableCell>
                      <TableCell>{item?.useragent?.browser}</TableCell>
                      <TableCell>{formatDate(item?.createdAt)}</TableCell>
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
                isLoading={gettingAuditLog}
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

export default AuditLogPage;
