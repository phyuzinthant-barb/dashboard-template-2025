import { apiService } from "@/service/apiService";

const TermsEndpoints = apiService.injectEndpoints({
  endpoints: (builder) => ({
    terms: builder.query<any, void>({
      query: () => ({
        url: "contents/legal-agreements/terms-and-conditions",
        method: "GET",
      }),
      providesTags: ["Terms"],
    }),

    postTerms: builder.mutation<any, { content: string }>({
      query: ({ content }) => {
        const formData = new FormData();
        formData.append("content", content);
        return {
          url: "contents/legal-agreements/terms-and-conditions",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Terms"],
    }),

    deleteTerms: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `contents/legal-agreements/terms-and-conditions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Terms"],
    }),

    putTerms: builder.mutation<any, { content: string }>({
      query: ({ content }) => ({
        url: `contents/legal-agreements`,
        method: "PUT",
        body: { content, type: "T&C" },
      }),
      invalidatesTags: ["Terms"],
    }),
  }),
});

export const {
  useTermsQuery,
  usePostTermsMutation,
  useDeleteTermsMutation,
  usePutTermsMutation,
} = TermsEndpoints;
