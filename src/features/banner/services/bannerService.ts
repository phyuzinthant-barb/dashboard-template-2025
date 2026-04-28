import { apiService } from "@/service/apiService";

const bannerEndpoints = apiService.injectEndpoints({
  endpoints: (builder) => ({
    banner: builder.query<any, void>({
      query: () => ({
        url: "cms/banners",
        method: "GET",
      }),
      providesTags: ["Banner"],
    }),

    postBanner: builder.mutation<any, { image: File }>({
      query: ({ image }) => {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("sortOrder", "10");
        return {
          url: "cms/banners",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Banner"],
    }),

    deleteBanner: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `cms/banners/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Banner"],
    }),

    putBanner: builder.mutation<any, { id: string; image: File }>({
      query: ({ id, image }) => ({
        url: `cms/banners/${id}`,
        method: "PATCH",
        body: { image },
      }),
      invalidatesTags: ["Banner"],
    }),

    updateBannerOrder: builder.mutation<
      any,
      { updates: { id: string; sortOrder: number }[] }
    >({
      query: ({ updates }) => ({
        url: "cms/banners/reorder",
        method: "PATCH",
        body: { updates },
      }),
      invalidatesTags: ["Banner"],
    }),
  }),
});

export const {
  useBannerQuery,
  usePostBannerMutation,
  useDeleteBannerMutation,
  usePutBannerMutation,
  useUpdateBannerOrderMutation,
} = bannerEndpoints;
