import { apiService } from "@/service/apiService";

const userEndpoints = apiService.injectEndpoints({
  endpoints: (builder) => ({
    transaction: builder.query<any, { param?: string }>({
      query: ({ param }) => ({
        url: `transactions${param ? `?${param}` : ""}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useTransactionQuery } = userEndpoints;
