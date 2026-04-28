import Route from "@/routes/types";
import AnnouncementPage from "./pages/AnnouncementPage";
import AddAnnouncementPage from "./pages/AddAnnouncementPage";
import EditAnnouncementPage from "./pages/EditAnnouncementPage";

export const announcementRoutes: Route[] = [
  {
    path: "announcement",
    element: <AnnouncementPage />,
  },
  {
    path: "announcement/add",
    element: <AddAnnouncementPage />,
  },
  {
    path: "announcement/edit/:id",
    element: <EditAnnouncementPage />,
  },
];
