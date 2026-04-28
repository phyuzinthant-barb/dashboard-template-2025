import { useSearchParams } from "react-router-dom";

const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") || "asc";
  const limit = searchParams.get("limit") || "10";
  const page = searchParams.get("page") || "1";

  const toggleSortBy = (payload: string) => {
    searchParams.set("sortBy", payload);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  const handlePageChange = (payload: number) => {
    searchParams.set("page", `${payload}`);
    searchParams.set("limit", limit);
    setSearchParams(searchParams);
  };

  const handleLimitChange = (payload: number) => {
    searchParams.set("limit", `${payload}`);
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };

  const toggleSortOrder = () => {
    const newSortOrder =
      searchParams.get("sortOrder") === "asc" ? "desc" : "asc";
    searchParams.set("sortOrder", newSortOrder);
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };

  return {
    toggleSortBy,
    handleLimitChange,
    toggleSortOrder,
    handlePageChange,
    sortBy,
    sortOrder,
  };
};

export default usePagination;
