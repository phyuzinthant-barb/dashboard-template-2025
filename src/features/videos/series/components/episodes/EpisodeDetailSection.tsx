import { useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "@/components/ErrorMessage";
import { getErrorMessage } from "@/utils/errorHandler";
import { useSingleEpisodeQuery } from "../../services/episodeService";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const EpisodeDetailSection = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useSingleEpisodeQuery({
    id: id as string,
  });

  const nav = useNavigate();

  return (
    <>
      {error && <ErrorMessage message={getErrorMessage(error)} />}
      {!isLoading && (
        <div className=" space-y-4">
          <div className=" bg-white rounded-xl">
            <div className=" px-4 py-3 border-b-[1.5px] border-b-blue-500 ">
              <p className=" font-semibold text-xl">Episode Details</p>
            </div>
            <div className=" pt-5 p-4 space-y-6">
              <div className=" grid grid-cols-4 gap-4">
                <div className=" space-y-2  ">
                  <p className=" font-medium text-base">Episode Name</p>
                  <Input value={data?.name} readOnly />
                </div>
                <div className=" space-y-2">
                  <p className=" font-medium text-base">Episode Number</p>
                  <Input value={data?.sortOrder} readOnly />
                </div>
                <div className=" space-y-2">
                  <p className=" font-medium text-base">Duration</p>
                  <Input value={data?.duration} readOnly />
                </div>
                <div className=" space-y-2">
                  <p className=" font-medium text-base">Type</p>
                  <Input value={data?.plan} readOnly />
                </div>
                <div className=" col-span-full space-y-2">
                  <p className=" font-medium text-base">Trailer Url</p>
                  <Input value={data?.trailerUrl} readOnly />
                </div>
                <div className=" col-span-full space-y-2">
                  <p className=" font-medium text-base">Episode Url</p>
                  <Input value={data?.videoUrl} readOnly />
                </div>
                <div className=" col-span-full space-y-2">
                  <p className=" font-medium text-base">Description</p>
                  <Textarea rows={6} value={data?.description} readOnly />
                </div>
                <div className=" flex justify-end col-span-full">
                  <Button
                    className=" h-11 w-24"
                    onClick={() => nav(-1)}
                    variant={"outline"}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EpisodeDetailSection;
