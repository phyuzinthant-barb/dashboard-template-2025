import { apiService } from "@/service/apiService";
import { CastFormValues } from "../types";

const userEndpoints = apiService.injectEndpoints({
  endpoints: (builder) => ({
    cast: builder.query<any, void>({
      query: () => ({
        method: "GET",
        url: `videos/casts?limit=9999`,
      }),
      providesTags: ["Cast"],
    }),

    postCast: builder.mutation<any, CastFormValues>({
      query: ({ name, profilePicture, role }) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("role", role);
        if (profilePicture) {
          formData.append("profilePicture", profilePicture);
        }
        return {
          method: "POST",
          url: "videos/casts",
          body: formData,
        };
      },
      invalidatesTags: ["Cast"],
    }),

    deleteCast: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `videos/casts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cast"],
    }),

    putCast: builder.mutation<
      any,
      { id: string; name: string; profilePicture?: File; role: string }
    >({
      query: ({ id, name, profilePicture, role }) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("role", role);
        if (profilePicture) {
          formData.append("profilePicture", profilePicture);
        }
        return {
          url: `videos/casts/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Cast"],
    }),
  }),
});

export const {
  useCastQuery,
  usePostCastMutation,
  useDeleteCastMutation,
  usePutCastMutation,
} = userEndpoints;
