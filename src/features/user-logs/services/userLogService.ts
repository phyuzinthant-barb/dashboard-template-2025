import { apiService } from "@/service/apiService";

const userLogEndpoints = apiService.injectEndpoints({
  endpoints: (builder) => ({
    userLog: builder.query<any, { param?: string }>({
      query: ({ param }) => ({
        url: `user-logs${param ? `?${param}` : ""}`,
        method: "GET",
      }),
    }),
  }),
});

// name in all pages
// pon
// organize projects
export const { useUserLogQuery } = userLogEndpoints;
