import Route from "@/routes/types";
import ControlReminderPage from "./pages/ControlReminderPage";

export const reminderRoutes: Route[] = [
  {
    path: "/reminder",
    element: <ControlReminderPage />,
  },
];
