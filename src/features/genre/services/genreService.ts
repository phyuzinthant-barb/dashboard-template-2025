import { apiService } from "@/service/apiService";
import { GenreFormValues } from "../types";

const userEndpoints = apiService.injectEndpoints({
  endpoints: (builder) => ({
    genre: builder.query<any, { param?: string }>({
      query: ({ param } = {}) => ({
        url: `videos/genres${param ? `?${param}` : ""}`,
        method: "GET",
      }),
      providesTags: ["Genre"],
    }),

    postGenre: builder.mutation<any, GenreFormValues>({
      query: ({ name, genreIcon }) => {
        const formData = new FormData();
        formData.append("name", name);
        if (genreIcon) {
          formData.append("genreIcon", genreIcon);
        }
        return {
          url: "videos/genres",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Genre"],
    }),

    deleteGenre: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `videos/genres/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Genre"],
    }),

    putGenre: builder.mutation<
      any,
      { id: string; name: string; genreIcon?: File }
    >({
      query: ({ id, name, genreIcon }) => {
        const formData = new FormData();
        formData.append("name", name);
        if (genreIcon) {
          formData.append("genreIcon", genreIcon);
        }
        return {
          url: `videos/genres/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Genre"],
    }),
  }),
});

export const {
  useGenreQuery,
  usePostGenreMutation,
  useDeleteGenreMutation,
  usePutGenreMutation,
} = userEndpoints;
