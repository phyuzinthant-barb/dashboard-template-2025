import { apiService } from "@/service/apiService";
import { CustomersFormValues } from "../types";

const CustomersEndpoints = apiService.injectEndpoints({
  endpoints: (builder) => ({
    Customers: builder.query<any, { param?: string }>({
      query: ({ param } = {}) => ({
        url: `users${param ? `?${param}` : ""}`,
        method: "GET",
      }),
      providesTags: ["Customers"],
    }),

    postCustomers: builder.mutation<any, { data: CustomersFormValues }>({
      query: ({ data }) => ({
        url: "users",
        method: "POST",
        body: { ...data, currency: "MMK", status: true },
      }),
      invalidatesTags: ["Customers"],
    }),

    deleteCustomers: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customers"],
    }),

    putCustomers: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `users/${id}/toggle-ban`,
        method: "PATCH",
      }),
      invalidatesTags: ["Customers"],
    }),
  }),
});

export const {
  useCustomersQuery,
  usePostCustomersMutation,
  useDeleteCustomersMutation,
  usePutCustomersMutation,
} = CustomersEndpoints;
