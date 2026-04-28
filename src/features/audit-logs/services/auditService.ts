import { apiService } from "@/service/apiService";

const auditEndpoints = apiService.injectEndpoints({
  endpoints: (builder) => ({
    auditLog: builder.query<any, { param?: string }>({
      query: ({ param }) => ({
        url: `audit-logs${param ? `?${param}` : ""}`,
        method: "GET",
      }),
    }),
  }),
});

// name in all pages
// pon
// organize projects
export const { useAuditLogQuery } = auditEndpoints;
