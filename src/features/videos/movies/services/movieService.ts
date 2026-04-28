import { apiService } from "@/service/apiService";

const userEndpoints = apiService.injectEndpoints({
  endpoints: (builder) => ({
    movie: builder.query<any, { param?: string }>({
      query: ({ param } = {}) => ({
        url: `videos/movies${param ? `?${param}` : ""}`,
        method: "GET",
      }),
      providesTags: ["Movie"],
    }),

    singleMovie: builder.query<any, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `videos/movies/${id}`,
        method: "GET",
      }),
      providesTags: ["Movie"],
    }),

    postMovie: builder.mutation<any, any>({
      query: (movieData) => {
        const formData = new FormData();
        Object.entries(movieData).forEach(([key, value]) => {
          if (key === "posterImage" || key === "bannerImage") {
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

        formData.append("publishedYear", "2025-01-01T00:00:00.000Z");

        return {
          url: "videos/movies",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Movie"],
    }),

    deleteMovie: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `videos/movies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Movie"],
    }),

    putMovie: builder.mutation<any, { id: string; movieData: any }>({
      query: ({ id, movieData }) => {
        const formData = new FormData();

        Object.entries(movieData).forEach(([key, value]) => {
          if (key === "posterImage" || key === "bannerImage") {
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

        formData.append("publishedYear", "2025-01-01T00:00:00.000Z");

        return {
          url: `videos/movies/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Movie"],
    }),
  }),
});

export const {
  useMovieQuery,
  useSingleMovieQuery,
  usePostMovieMutation,
  useDeleteMovieMutation,
  usePutMovieMutation,
} = userEndpoints;
