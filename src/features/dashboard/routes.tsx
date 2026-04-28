import Route from "@/routes/types";
import DashboardPage from "./pages/DashboardPage";

export const dashboardRoutes: Route[] = [
  {
    path: "",
    element: <DashboardPage />,
    index: true,
  },
];
