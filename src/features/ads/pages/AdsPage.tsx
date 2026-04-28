import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import useAds from "../hooks/useAds";
import TableSkeletonLoader from "@/components/TableSkeleton";
import ConfirmDelete from "@/components/ConfirmDelete";
import AddAdsForm from "../components/AddAdsForm";
import EditAdsForm from "../components/EditAdsForm";
import { useProfile } from "@/features/auth/hooks/useProfile";

type AdsData = {
  type: string;
  imageUrl: string;
  reference?: string;
  promotionUrl?: string;
  id: string;
};

const AdsPage = () => {
  const { isAuthorized } = useProfile();

  const deleteRef = useRef<HTMLButtonElement | null>(null);
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);
  const [editData, setEditData] = useState<AdsData | undefined>(undefined);

  const { data, gettingAds, deleteAds } = useAds();

  return (
    <section>
      <div>
        <>
          {gettingAds ? (
            <TableSkeletonLoader />
          ) : (
            <>
              {isAuthorized("Ads", "Create") &&
                isAuthorized("Ads", "Update") && (
                  <>
                    {editData ? (
                      <EditAdsForm data={editData} setData={setEditData} />
                    ) : (
                      <>{data?.count !== 1 && <AddAdsForm />}</>
                    )}
                  </>
                )}

              {data?.count > 0 && (
                <div className=" bg-white rounded-xl mt-4 ">
                  <div className="px-4 py-5 border-b-2 text-xl font-semibold border-b-blue-600">
                    Ads
                  </div>
                  <div className="px-4 py-5">
                    {data?.data?.map((el: any, index: number) => (
                      <div
                        key={index}
                        className="items-center flex justify-between my-4 py-2 px-4  rounded-lg"
                      >
                        <div className=" grid grid-cols-3 gap-2">
                          <div className=" space-y-2">
                            <p className=" font-semibold">Ads</p>
                            <p className=" w-full line-clamp-1">
                              {el?.imageUrl}
                            </p>
                          </div>

                          <div className=" space-y-2">
                            <p className=" font-semibold">Type</p>
                            <p className=" w-full line-clamp-1">{el?.type}</p>
                          </div>
                          <div className=" space-y-2">
                            <p className=" font-semibold">Movie Name</p>
                            <p className=" w-full line-clamp-1">
                              {el?.reference?.name}
                              <a href={el?.promotionUrl} target="_blank">
                                {el?.promotionUrl}
                              </a>
                            </p>
                          </div>
                        </div>
                        <div className=" flex items-center gap-4">
                          <Button
                            disabled={!!editData}
                            onClick={() => {
                              deleteRef?.current?.click();
                              setDeleteId(el._id);
                            }}
                            className=" px-10 py-5"
                            variant={"outline"}
                            size={"lg"}
                          >
                            Delete
                          </Button>
                          <Button
                            disabled={!!editData}
                            onClick={() => {
                              setEditData({
                                type: el?.type || "",
                                imageUrl: el?.imageUrl || "",
                                reference: el?.reference?._id || "",
                                promotionUrl: el?.promotionUrl || "",
                                id: el?._id || "",
                              });
                            }}
                            size={"lg"}
                            className=" px-10 py-5"
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      </div>

      <ConfirmDelete
        ref={deleteRef}
        cancel={() => setDeleteId(undefined)}
        run={() => deleteAds(deleteId as string)}
      />
    </section>
  );
};

export default AdsPage;
