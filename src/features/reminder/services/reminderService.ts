import { apiService } from "@/service/apiService";

const ReminderEndpoints = apiService.injectEndpoints({
  endpoints: (builder) => ({
    Reminder: builder.query<any, void>({
      query: () => ({
        url: "settings/reminder",
        method: "GET",
      }),
      providesTags: ["Reminder"],
    }),

    postReminder: builder.mutation<any, { Reminder: string }>({
      query: ({ Reminder }) => ({
        url: "settings/reminder",
        method: "POST",
        body: { Reminder },
      }),
      invalidatesTags: ["Reminder"],
    }),

    deleteReminder: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `settings/reminder/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reminder"],
    }),

    putReminder: builder.mutation<any, { days: number }>({
      query: ({ days }) => ({
        url: `settings/reminder`,
        method: "PUT",
        body: {
          type: "REMINDER_SETTINGS",
          metadata: {
            reminderDay: days,
          },
        },
      }),
      invalidatesTags: ["Reminder"],
    }),
  }),
});

export const {
  useReminderQuery,
  usePostReminderMutation,
  useDeleteReminderMutation,
  usePutReminderMutation,
} = ReminderEndpoints;
