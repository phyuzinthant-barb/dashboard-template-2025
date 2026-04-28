import { apiService } from "@/service/apiService";

const userEndpoints = apiService.injectEndpoints({
  endpoints: (builder) => ({
    season: builder.query<any, void>({
      query: () => ({
        url: `videos/seasons`,
        method: "GET",
      }),
      providesTags: ["Seasons", "Series"],
    }),

    singleSeason: builder.query<any, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `videos/seasons/${id}?include_episodes=true`,
        method: "GET",
      }),
      providesTags: ["Seasons", "Series"],
    }),

    postSeason: builder.mutation<any, any>({
      query: (seasonData) => {
        const formData = new FormData();
        Object.entries(seasonData).forEach(([key, value]) => {
          if (key === "bannerImage") {
            formData.append(key, value as File);
          } else if (
            key === "actors" ||
            key === "actresses" ||
            key === "tags" ||
            key === "genres"
          ) {
            formData.append(key, JSON.stringify(value));
          } else if (key === "supports") {
            if (value == undefined) {
              formData.delete("supports");
            } else formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, String(value));
          }
        });
        formData.append("plan", "FREE");
        formData.append("publishedYear", "2025-04-10T14:28:03.102Z");

        return {
          url: "videos/seasons",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Seasons", "Series"],
    }),

    deleteSeason: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `videos/seasons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Seasons", "Series"],
    }),

    putSeason: builder.mutation<any, { id: string; SeasonData: any }>({
      query: ({ id, SeasonData }) => {
        const formData = new FormData();
        Object.entries(SeasonData).forEach(([key, value]) => {
          if (key === "bannerImage") {
            formData.append(key, value as File);
          } else if (
            key === "actors" ||
            key === "actresses" ||
            key === "tags" ||
            key === "genres"
          ) {
            formData.append(key, JSON.stringify(value));
          } else if (key === "supports") {
            if (value == undefined) {
              formData.delete("supports");
            } else formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, String(value));
          }
        });

        return {
          url: `videos/seasons/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Seasons", "Series"],
    }),
  }),
});

export const {
  useSeasonQuery,
  useSingleSeasonQuery,
  usePostSeasonMutation,
  useDeleteSeasonMutation,
  usePutSeasonMutation,
} = userEndpoints;
