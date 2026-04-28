import Route from "@/routes/types";
import BannerPage from "./pages/BannerPage";
import AddBannerPage from "./pages/AddBannerPage";

export const bannerRoutes: Route[] = [
  {
    path: "cms/banner",
    element: <BannerPage />,
  },
  {
    path: "cms/banner/add",
    element: <AddBannerPage />,
  },
];
