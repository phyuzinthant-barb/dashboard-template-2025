import Route from "@/routes/types";
import BannerPage from "./pages/AdsPage";

export const adsRoutes: Route[] = [
  {
    path: "cms/ads",
    element: <BannerPage />,
  },
];
