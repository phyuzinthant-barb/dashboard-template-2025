import Route from "@/routes/types";
import UserLogPage from "./pages/UserLogPage";

export const userLogRoutes: Route[] = [
  {
    path: "/reporting/user-logs",
    element: <UserLogPage />,
  },
];
