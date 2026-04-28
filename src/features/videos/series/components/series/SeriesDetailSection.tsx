import { useParams } from "react-router-dom";
import { useSingleSeriesQuery } from "../../services/seriesService";
import { Input } from "@/components/ui/input";
import { formatDate } from "date-fns";
import ErrorMessage from "@/components/ErrorMessage";
import { getErrorMessage } from "@/utils/errorHandler";

const SeriesDetailSection = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useSingleSeriesQuery({ id: id as string });

  return (
    <>
      {error && <ErrorMessage message={getErrorMessage(error)} />}
      {!isLoading && (
        <div className=" space-y-4">
          <div className=" bg-white rounded-xl">
            <div className=" px-4 py-3 border-b-[1.5px] border-b-blue-500 ">
              <p className=" font-semibold text-xl">Series Details</p>
            </div>
            <div className=" pt-5 p-4 space-y-6">
              <div className=" flex justify-start gap-12 items-center">
                <div className=" space-y-2">
                  <p className=" font-medium text-base">Poster Photo</p>
                  <img
                    src={data?.posterImageUrl}
                    alt=""
                    className=" h-[300px] w-[243px] rounded-lg object-cover"
                  />
                </div>
                <div className=" space-y-2">
                  <p className=" font-medium text-base">Banner Photo</p>
                  <img
                    src={data?.bannerImageUrl}
                    alt=""
                    className=" h-[300px] w-[405px] rounded-lg object-cover"
                  />
                </div>
              </div>
              <div className=" grid grid-cols-2 gap-4">
                <div className=" space-y-2  col-span-full">
                  <p className=" font-medium text-base">Series Name</p>
                  <Input value={data?.name} readOnly />
                </div>
                <div className=" space-y-2">
                  <p className=" font-medium text-base">Category</p>
                  <Input value={data?.category?.name} readOnly />
                </div>
                <div className=" space-y-2">
                  <p className=" font-medium text-base">Genre</p>
                  <Input
                    value={data?.genres?.map((el: any) => el?.name).join(",")}
                    readOnly
                  />
                </div>
                <div className=" space-y-2">
                  <p className=" font-medium text-base">Type</p>
                  <Input value={data?.plan} readOnly />
                </div>

                {data?.payPerViewPrice && (
                  <div className=" space-y-2">
                    <p className=" font-medium text-base">Price</p>
                    <Input value={data?.payPerViewPrice} readOnly />
                  </div>
                )}

                {data?.scheduleAt && (
                  <div className=" space-y-2">
                    <p className=" font-medium text-base">Schedule</p>
                    <Input
                      value={formatDate(
                        new Date(data?.scheduleAt),
                        "dd MMM yyyy"
                      )}
                      readOnly
                    />
                  </div>
                )}

                <div className=" space-y-2">
                  <p className=" font-medium text-base">Tag</p>
                  <Input value={data?.tags?.join(",")} readOnly />
                </div>

                <div className=" space-y-2">
                  <p className=" font-medium text-base">Script Writer</p>
                  <Input value={data?.scriptWriter} readOnly />
                </div>

                <div className=" space-y-2">
                  <p className=" font-medium text-base">Director</p>
                  <Input value={data?.director} readOnly />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SeriesDetailSection;
