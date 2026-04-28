import { apiService } from "@/service/apiService";

const userEndpoints = apiService.injectEndpoints({
  endpoints: (builder) => ({
    episodes: builder.query<any, void>({
      query: () => ({
        url: `videos/episodes`,
        method: "GET",
      }),
      providesTags: ["Seasons", "Series", "Episodes"],
    }),

    singleEpisode: builder.query<any, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `videos/episodes/${id}`,
        method: "GET",
      }),
      providesTags: ["Seasons", "Series", "Episodes"],
    }),

    postEpisodes: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: "videos/episodes",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Seasons", "Series", "Episodes"],
    }),

    deleteEpisodes: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `videos/episodes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Seasons", "Series", "Episodes"],
    }),

    putEpisodes: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `videos/episodes/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Seasons", "Series", "Episodes"],
    }),
  }),
});

export const {
  useEpisodesQuery,
  useSingleEpisodeQuery,
  usePostEpisodesMutation,
  useDeleteEpisodesMutation,
  usePutEpisodesMutation,
} = userEndpoints;
