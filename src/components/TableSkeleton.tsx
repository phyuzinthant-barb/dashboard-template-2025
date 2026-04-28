import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TableSkeletonLoader = () => {
  return (
    <>
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <div className="w-1/2 animate-pulse h-3 rounded-lg bg-gray-300"></div>
            </TableHead>
            <TableHead>
              <div className="w-1/2 animate-pulse h-3 rounded-lg bg-gray-300"></div>
            </TableHead>
            <TableHead>
              <div className="w-1/2 animate-pulse h-3 rounded-lg bg-gray-300"></div>
            </TableHead>
            <TableHead>
              <div className="w-1/2 animate-pulse h-3 rounded-lg bg-gray-300"></div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(20)].map((_, index) => (
            <TableRow key={index}>
              <TableHead>
                <div className="w-1/2 animate-pulse h-3 rounded-lg bg-gray-300"></div>
              </TableHead>
              <TableHead>
                <div className="w-1/2 animate-pulse h-3 rounded-lg bg-gray-300"></div>
              </TableHead>
              <TableHead>
                <div className="w-1/2 animate-pulse h-3 rounded-lg bg-gray-300"></div>
              </TableHead>
              <TableHead>
                <div className="w-1/2 animate-pulse h-3 rounded-lg bg-gray-300"></div>
              </TableHead>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TableSkeletonLoader;
