import { apiService } from "@/service/apiService";

const AdminRoleEndpoints = apiService.injectEndpoints({
  endpoints: (builder) => ({
    adminRole: builder.query<any, void>({
      query: () => ({
        url: "admins/roles",
        method: "GET",
      }),
      providesTags: ["AdminRoles"],
    }),

    permissions: builder.query<any, void>({
      query: () => ({
        url: "admins/permissions",
        method: "GET",
      }),
      providesTags: ["AdminRoles"],
    }),

    singleAdminRole: builder.query<any, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `admins/roles/${id}`,
        method: "GET",
      }),
      providesTags: ["AdminRoles"],
    }),

    postAdminRole: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: "admins/roles",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AdminRoles"],
    }),

    deleteAdminRole: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `admins/roles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminRoles"],
    }),

    putAdminRole: builder.mutation<any, any>({
      query: ({ id, data }) => {
        return {
          url: `admins/roles/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["AdminRoles"],
    }),
  }),
});

export const {
  useAdminRoleQuery,
  usePermissionsQuery,
  useSingleAdminRoleQuery,
  usePostAdminRoleMutation,
  useDeleteAdminRoleMutation,
  usePutAdminRoleMutation,
} = AdminRoleEndpoints;
