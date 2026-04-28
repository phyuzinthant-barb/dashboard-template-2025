import { apiService } from "@/service/apiService";

const PolicyEndpoints = apiService.injectEndpoints({
  endpoints: (builder) => ({
    policy: builder.query<any, void>({
      query: () => ({
        url: "contents/legal-agreements/privacy-and-policy",
        method: "GET",
      }),
      providesTags: ["Policy"],
    }),

    postPolicy: builder.mutation<any, { content: string }>({
      query: ({ content }) => {
        const formData = new FormData();
        formData.append("content", content);
        return {
          url: "contents/legal-agreements/privacy-and-policy",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Policy"],
    }),

    deletePolicy: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `contents/legal-agreements/privacy-and-policy/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Policy"],
    }),

    putPolicy: builder.mutation<any, { content: string }>({
      query: ({ content }) => ({
        url: `contents/legal-agreements`,
        method: "PUT",
        body: { content, type: "P&P" },
      }),
      invalidatesTags: ["Policy"],
    }),
  }),
});

export const {
  usePolicyQuery,
  usePostPolicyMutation,
  useDeletePolicyMutation,
  usePutPolicyMutation,
} = PolicyEndpoints;
