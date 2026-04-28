import { apiService } from "@/service/apiService";

const roleEndpoints = apiService.injectEndpoints({
  endpoints: (builder) => ({
    role: builder.query<any, void>({
      query: () => ({
        url: "videos/cast-roles?getAll=true",
        method: "GET",
      }),
      providesTags: ["Role"],
    }),

    postRole: builder.mutation<any, { role: string }>({
      query: ({ role }) => ({
        url: "videos/cast-roles",
        method: "POST",
        body: { role },
      }),
      invalidatesTags: ["Role"],
    }),

    deleteRole: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `videos/cast-roles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Role"],
    }),

    putRole: builder.mutation<any, { id: string; role: string }>({
      query: ({ id, role }) => ({
        url: `videos/cast-roles/${id}`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: ["Role"],
    }),
  }),
});

export const {
  useRoleQuery,
  usePostRoleMutation,
  useDeleteRoleMutation,
  usePutRoleMutation,
} = roleEndpoints;
