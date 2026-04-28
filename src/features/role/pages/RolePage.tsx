import { useRef, useState } from "react";
import useRole from "../hooks/useRole";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeletonLoader from "@/components/TableSkeleton";
import AddRoleBox from "../components/AddRoleBox";
import ConfirmDelete from "@/components/ConfirmDelete";
import EditRoleBox from "../components/EditRoleBox";

const RolePage = () => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const editRef = useRef<HTMLButtonElement | null>(null);
  const deleteRef = useRef<HTMLButtonElement | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  const { data, gettingRoles, deleteRole } = useRole();

  return (
    <section>
      <div className=" flex justify-between items-center">
        <p className=" text-xl font-semibold">Roles</p>
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center">
                        Start Adding Data :)
                      </TableCell>
                    </TableRow>
                  )}
                  {data?.data?.map((item: any, index: number) => (
                    <TableRow key={item._id}>
                      <TableCell className=" w-[50px]">{index + 1}.</TableCell>
                      <TableCell>{item?.role}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </>
      </div>

      <AddRoleBox ref={ref} />
      <EditRoleBox
        ref={editRef}
        id={editId}
        name={name}
        setName={setName}
        setId={setEditId}
      />
      <ConfirmDelete
        ref={deleteRef}
        cancel={() => setDeleteId(null)}
        run={() => deleteRole(deleteId as string)}
      />
    </section>
  );
};

export default RolePage;
