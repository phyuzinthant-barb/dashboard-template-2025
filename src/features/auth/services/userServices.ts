import { apiService } from "@/service/apiService";

const userEndpoints = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<any, void>({
      query: () => ({
        url: "auth/me",
        method: "GET",
      }),
      providesTags: ["Me"],
    }),

    updatePassword: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `auth/change_password`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Me"],
    }),

    putMe: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `auth/me`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Me"],
    }),
  }),
});

export const { useGetMeQuery, usePutMeMutation, useUpdatePasswordMutation } =
  userEndpoints;
