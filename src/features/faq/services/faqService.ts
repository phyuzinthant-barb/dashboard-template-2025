import { apiService } from "@/service/apiService";
import { FAQFormValues } from "../types";

const userEndpoints = apiService.injectEndpoints({
  endpoints: (builder) => ({
    FAQ: builder.query<any, void>({
      query: () => ({
        url: "contents/faqs?getAll=true",
        method: "GET",
      }),
      providesTags: ["FAQ"],
    }),

    postFAQ: builder.mutation<any, FAQFormValues>({
      query: ({ answer, question }) => {
        return {
          url: "contents/faqs",
          method: "POST",
          body: { answer, question },
        };
      },
      invalidatesTags: ["FAQ"],
    }),

    deleteFAQ: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `contents/faqs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FAQ"],
    }),

    putFAQ: builder.mutation<ResponseType, { id: string; data: FAQFormValues }>(
      {
        query: ({ id, data }) => ({
          url: `contents/faqs/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["FAQ"],
      }
    ),
  }),
});

export const {
  useFAQQuery,
  usePostFAQMutation,
  useDeleteFAQMutation,
  usePutFAQMutation,
} = userEndpoints;
