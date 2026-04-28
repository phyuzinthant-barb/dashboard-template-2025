import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useParams } from "react-router-dom";
import { useSingleEpisodeQuery } from "../../services/episodeService";
import { useSingleSeasonQuery } from "../../services/seasonService";
import EpisodeDetailSection from "../../components/episodes/EpisodeDetailSection";

const EpisodeDetailPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useSingleEpisodeQuery({
    id: id as string,
  });

  const { data: seasonData } = useSingleSeasonQuery(
    { id: data?.season as string },
    { skip: isLoading }
  );

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/video-list/series">
              Series List
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/video-list/series/season/detail/${data?._id}`}
            >
              {seasonData?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{data?.name} Detail</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className=" mt-6">
        <EpisodeDetailSection />
      </div>
    </div>
  );
};

export default EpisodeDetailPage;
