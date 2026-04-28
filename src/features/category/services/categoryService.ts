import { apiService } from "@/service/apiService";

const userEndpoints = apiService.injectEndpoints({
  endpoints: (builder) => ({
    category: builder.query<any, void>({
      query: () => ({
        url: "videos/categories?getAll=true",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    postCategory: builder.mutation<any, { name: string }>({
      query: ({ name }) => ({
        url: "videos/categories",
        method: "POST",
        body: { name },
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `videos/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    putCategory: builder.mutation<any, { id: string; name: string }>({
      query: ({ id, name }) => ({
        url: `videos/categories/${id}`,
        method: "PUT",
        body: { name },
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useCategoryQuery,
  usePostCategoryMutation,
  useDeleteCategoryMutation,
  usePutCategoryMutation,
} = userEndpoints;
