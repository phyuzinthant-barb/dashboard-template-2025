import { apiService } from "@/service/apiService";
import { PackageFormValues } from "../types";

const packagesEndpoints = apiService.injectEndpoints({
  endpoints: (builder) => ({
    Packages: builder.query<any, { param?: string }>({
      query: ({ param } = {}) => ({
        url: `packages/plans${param ? `?${param}` : ""}`,
        method: "GET",
      }),
      providesTags: ["Packages"],
    }),

    postPackages: builder.mutation<any, { data: PackageFormValues }>({
      query: ({ data }) => ({
        url: "packages/plans",
        method: "POST",
        body: { ...data, currency: "MMK", status: true },
      }),
      invalidatesTags: ["Packages"],
    }),

    deletePackages: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `packages/plans/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Packages"],
    }),

    putPackages: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `packages/plans/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Packages"],
    }),
  }),
});

export const {
  usePackagesQuery,
  usePostPackagesMutation,
  useDeletePackagesMutation,
  usePutPackagesMutation,
} = packagesEndpoints;
