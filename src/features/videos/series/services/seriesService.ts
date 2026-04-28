import { apiService } from "@/service/apiService";

const userEndpoints = apiService.injectEndpoints({
  endpoints: (builder) => ({
    series: builder.query<any, { param?: string }>({
      query: ({ param } = {}) => ({
        url: `videos/series?includeSeasons=true${param ? `&${param}` : ""}`,
        method: "GET",
      }),
      providesTags: ["Series"],
    }),

    singleSeries: builder.query<any, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `videos/series/${id}`,
        method: "GET",
      }),
      providesTags: ["Series"],
    }),

    postSeries: builder.mutation<any, any>({
      query: (SeriesData) => {
        const formData = new FormData();
        Object.entries(SeriesData).forEach(([key, value]) => {
          if (key === "posterImage" || key === "bannerImage") {
            formData.append(key, value as File);
          } else if (key === "tags" || key === "genres") {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, String(value));
          }
        });

        return {
          url: "videos/series",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Series"],
    }),

    deleteSeries: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `videos/series/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Series"],
    }),

    putSeries: builder.mutation<any, { id: string; SeriesData: any }>({
      query: ({ id, SeriesData }) => {
        const formData = new FormData();
        Object.entries(SeriesData).forEach(([key, value]) => {
          if (key === "posterImage" || key === "bannerImage") {
            formData.append(key, value as File);
          } else if (
            key === "actors" ||
            key === "actresses" ||
            key === "supports" ||
            key === "tags" ||
            key === "genres"
          ) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, String(value));
            if (SeriesData?.status == "SCHEDULED") {
              formData.append("scheduleAt", SeriesData?.scheduleAt);
            }
          }
        });

        return {
          url: `videos/series/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Series"],
    }),
  }),
});

export const {
  useSeriesQuery,
  useSingleSeriesQuery,
  usePostSeriesMutation,
  useDeleteSeriesMutation,
  usePutSeriesMutation,
} = userEndpoints;
