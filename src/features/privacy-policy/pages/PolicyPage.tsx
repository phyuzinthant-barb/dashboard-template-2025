import { useRef, useState } from "react";
import usePolicy from "../hooks/usePolicy";
import ConfirmDelete from "@/components/ConfirmDelete";
import AddPolicyForm from "../components/AddPolicyForm";

const PolicyPage = () => {
  const deleteRef = useRef<HTMLButtonElement | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, gettingPolicy, deletePolicy } = usePolicy();

  return (
    <section>
      <div className=" mt-4">
        <>
          {gettingPolicy ? (
            <p>Loading</p>
          ) : (
            <>
              <AddPolicyForm data={data?.content} />
            </>
          )}
        </>
      </div>

      <ConfirmDelete
        ref={deleteRef}
        cancel={() => setDeleteId(null)}
        run={() => deletePolicy(deleteId as string)}
      />
    </section>
  );
};

export default PolicyPage;
