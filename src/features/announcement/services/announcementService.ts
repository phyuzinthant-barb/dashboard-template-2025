import { apiService } from "@/service/apiService";
import { AnnouncementFormValues } from "../types";

const AnnouncementEndpoints = apiService.injectEndpoints({
  endpoints: (builder) => ({
    Announcement: builder.query<any, void>({
      query: () => ({
        url: "announcements",
        method: "GET",
      }),
      providesTags: ["Announcements"],
    }),

    singleAnnouncement: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `announcements/${id}`,
        method: "GET",
      }),
      providesTags: ["Announcements"],
    }),

    postAnnouncement: builder.mutation<any, AnnouncementFormValues>({
      query: (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("body", data.body);
        formData.append("image", data.image);
        formData.append("status", data.status);
        data.scheduleAt && formData.append("scheduleAt", data.scheduleAt);
        return {
          url: "announcements",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Announcements"],
    }),

    deleteAnnouncement: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `announcements/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Announcements"],
    }),

    putAnnouncement: builder.mutation<
      any,
      { id: string; data: AnnouncementFormValues }
    >({
      query: ({ id, data }) => {
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("body", data.body);
        if (data.image) formData.append("image", data.image);
        formData.append("status", data.status);
        data.scheduleAt && formData.append("scheduleAt", data.scheduleAt);
        return {
          url: `announcements/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Announcements"],
    }),
  }),
});

export const {
  useAnnouncementQuery,
  useSingleAnnouncementQuery,
  usePostAnnouncementMutation,
  useDeleteAnnouncementMutation,
  usePutAnnouncementMutation,
} = AnnouncementEndpoints;
