import { apiService } from "@/service/apiService";
import { AdsFormValues } from "../types";

const AdsEndpoints = apiService.injectEndpoints({
  endpoints: (builder) => ({
    ads: builder.query<any, void>({
      query: () => ({
        url: "cms/ads",
        method: "GET",
      }),
      providesTags: ["Ads"],
    }),

    postAds: builder.mutation<any, AdsFormValues>({
      query: (data) => {
        const formData = new FormData();
        formData.append("image", data.image);
        data.promotionUrl && formData.append("promotionUrl", data.promotionUrl);
        data.reference && formData.append("reference", data.reference);
        formData.append("type", data.type.toUpperCase());
        return {
          url: "cms/ads",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Ads"],
    }),

    deleteAds: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `cms/ads/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Ads"],
    }),

    putAds: builder.mutation<any, { id: string; data: AdsFormValues }>({
      query: ({ id, data }) => {
        const formData = new FormData();
        // formData.append("image", data.image);
        data.promotionUrl && formData.append("promotionUrl", data.promotionUrl);
        data.reference && formData.append("reference", data.reference);
        formData.append("type", data.type.toUpperCase());
        return {
          url: `cms/ads/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Ads"],
    }),
  }),
});

export const {
  useAdsQuery,
  usePostAdsMutation,
  useDeleteAdsMutation,
  usePutAdsMutation,
} = AdsEndpoints;
