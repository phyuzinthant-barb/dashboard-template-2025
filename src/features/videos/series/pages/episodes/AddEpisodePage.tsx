import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useParams } from "react-router-dom";
import { useSingleSeasonQuery } from "../../services/seasonService";
import AddEpisodesForm from "../../components/episodes/AddEpisodeForm";

const AddEpisodePage = () => {
  const { id } = useParams();

  const { data } = useSingleSeasonQuery({
    id: id as string,
  });

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
              href={`/video-list/series/detail/${data?.series?._id}`}
            >
              {data?.series?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/video-list/series/season/detail/${data?._id}`}
            >
              {data?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Add New Episode</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className=" mt-6">
        <AddEpisodesForm />
      </div>
    </div>
  );
};

export default AddEpisodePage;
