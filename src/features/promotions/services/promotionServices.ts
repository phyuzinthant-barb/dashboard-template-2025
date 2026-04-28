import { apiService } from "@/service/apiService";
import { PromotionFormValues } from "../types";

const PromotionsEndpoints = apiService.injectEndpoints({
  endpoints: (builder) => ({
    promotions: builder.query<any, void>({
      query: () => ({
        url: "packages/promotions?getAll=true",
        method: "GET",
      }),
      providesTags: ["Promotions"],
    }),

    postPromotions: builder.mutation<any, { data: PromotionFormValues }>({
      query: ({ data }) => ({
        url: "packages/promotions",
        method: "POST",
        body: { ...data, status: true },
      }),
      invalidatesTags: ["Promotions"],
    }),

    deletePromotions: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `packages/promotions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Promotions"],
    }),

    putPromotions: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `packages/promotions/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Promotions"],
    }),
  }),
});

export const {
  usePromotionsQuery,
  usePostPromotionsMutation,
  useDeletePromotionsMutation,
  usePutPromotionsMutation,
} = PromotionsEndpoints;
