import { apiService } from "@/service/apiService";

const adminEndpoints = apiService.injectEndpoints({
  endpoints: (builder) => ({
    admin: builder.query<any, { param?: string }>({
      query: ({ param } = {}) => ({
        url: `admins${param ? `?${param}` : ""}`,
        method: "GET",
      }),
      providesTags: ["Admins"],
    }),

    singleAdmin: builder.query<any, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `admins/${id}`,
        method: "GET",
      }),
      providesTags: ["Admins"],
    }),

    postAdmin: builder.mutation<any, any>({
      query: ({ name, profilePicture, role, email, phone, password }) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("role", role);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("password", password);
        if (profilePicture) {
          formData.append("profilePicture", profilePicture);
        }
        return {
          url: "admins",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Admins"],
    }),

    deleteAdmin: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `admins/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admins"],
    }),

    putAdmin: builder.mutation<any, any>({
      query: ({ id, name, profilePicture, role, phone, password }) => {
        const formData = new FormData();
        formData.append("name", name);
        if (profilePicture) {
          formData.append("profilePicture", profilePicture);
        }
        formData.append("role", role);
        // formData.append("email", email);
        formData.append("password", password);

        formData.append("phone", phone);
        return {
          url: `admins/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Admins"],
    }),
  }),
});

export const {
  useAdminQuery,
  useSingleAdminQuery,
  usePostAdminMutation,
  useDeleteAdminMutation,
  usePutAdminMutation,
} = adminEndpoints;
