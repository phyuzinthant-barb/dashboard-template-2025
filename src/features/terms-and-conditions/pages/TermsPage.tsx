import { useRef, useState } from "react";
import useTerms from "../hooks/useTerms";
import ConfirmDelete from "@/components/ConfirmDelete";
import AddTermsForm from "../components/AddTermsForm";

const TermsPage = () => {
  const deleteRef = useRef<HTMLButtonElement | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, gettingTerms, deleteTerms } = useTerms();

  return (
    <section>
      <div className=" mt-4">
        <>
          {gettingTerms ? (
            <p>Loading</p>
          ) : (
            <>
              <AddTermsForm data={data?.content} />
            </>
          )}
        </>
      </div>

      <ConfirmDelete
        ref={deleteRef}
        cancel={() => setDeleteId(null)}
        run={() => deleteTerms(deleteId as string)}
      />
    </section>
  );
};

export default TermsPage;
