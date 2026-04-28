import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeletonLoader from "@/components/TableSkeleton";
import { useTransactionQuery } from "../services/transactionService";
import { PaginationComponent } from "@/components/Pagination";
import { useSearchParams } from "react-router-dom";
import usePagination from "@/hooks/usePagination";
import FilterTransaction from "../components/FilterTransaction";
import SearchBar from "@/components/SearchBar";

const TransactionPage = () => {
  const [searchParams] = useSearchParams();

  const { data, isLoading: gettingTransaction } = useTransactionQuery({
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

  // Helper function to format amount
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US").format(amount);
  };

  return (
    <div>
      <div className="flex w-full mb-4 justify-between">
        <div className="flex flex-col gap-3">
          <p className="font-bold text-xl ">Transaction List</p>
          <div className="font-medium flex text-dark/60 items-center gap-2">
            <p className="font-medium dark:text-white text-base">
              Total transactions:
            </p>
            <p className="bg-white rounded border-input border text-base font-mono px-2 py-0.5">
              {data?.count}
            </p>
            <p className="font-medium text-base">transactions</p>
          </div>
          <SearchBar title="Search by nmae" />
        </div>
      </div>

      <FilterTransaction />

      <div className=" mt-4">
        <>
          {gettingTransaction ? (
            <TableSkeletonLoader />
          ) : (
            <>
              <div className=" w-full">
                <Table>
                  <TableHeader>
                    <TableRow className=" !bg-transparent">
                      <TableHead>#</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Package</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Transaction Type</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.data?.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center">
                          No transactions found
                        </TableCell>
                      </TableRow>
                    )}
                    {data?.data?.map((item: any, index: number) => (
                      <TableRow key={item._id}>
                        <TableCell className=" w-[10px]">
                          {(Number(searchParams.get("page") || 1) - 1) *
                            (Number(searchParams.get("limit") || 10) || 10) +
                            index +
                            1}
                          .
                        </TableCell>
                        <TableCell>{formatDate(item?.createdAt)}</TableCell>
                        <TableCell>{item?.user?.name}</TableCell>
                        <TableCell className=" lowercase">
                          {item?.user?.phone}
                        </TableCell>
                        <TableCell>
                          {item?.giftCode ? (
                            <span>Gift Code</span>
                          ) : (
                            item?.subscription?.plan?.name
                          )}
                        </TableCell>
                        <TableCell>{formatAmount(item?.amount)} MMK</TableCell>
                        <TableCell className="capitalize">
                          {item?.paymentGateway}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item?.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-800"
                                : item?.status === "SUCCESS"
                                ? "bg-green-100 text-green-800"
                                : item?.status === "FAILED"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {item?.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className=" relative">
                <PaginationComponent
                  currentPage={
                    searchParams.get("page")
                      ? Number(searchParams.get("page"))
                      : 1
                  }
                  totalPages={data?.totalPages}
                  isLoading={gettingTransaction}
                  onPageChange={handlePageChange}
                  handleLimitChange={handleLimitChange}
                />
              </div>
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default TransactionPage;
