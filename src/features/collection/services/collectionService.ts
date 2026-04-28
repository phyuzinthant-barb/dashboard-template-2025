import { apiService } from "@/service/apiService";

const userEndpoints = apiService.injectEndpoints({
  endpoints: (builder) => ({
    Collection: builder.query<any, void>({
      query: () => ({
        url: "videos/category-groups?getAll=true",
        method: "GET",
      }),
      providesTags: ["Collection"],
    }),

    postCollection: builder.mutation<
      any,
      {
        name: string;
        items: { reference: string; referenceModel: "Movie" | "Series" }[];
      }
    >({
      query: ({ name, items }) => ({
        url: "videos/category-groups",
        method: "POST",
        body: { name, items },
      }),
      invalidatesTags: ["Collection"],
    }),

    deleteCollection: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `videos/category-groups/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Collection"],
    }),

    putCollection: builder.mutation<
      any,
      {
        id: string;
        name: string;
        items: { reference: string; referenceModel: "Movie" | "Series" }[];
      }
    >({
      query: ({ id, name, items }) => ({
        url: `videos/category-groups/${id}`,
        method: "PUT",
        body: { name, items },
      }),
      invalidatesTags: ["Collection"],
    }),
  }),
});

export const {
  useCollectionQuery,
  usePostCollectionMutation,
  useDeleteCollectionMutation,
  usePutCollectionMutation,
} = userEndpoints;
