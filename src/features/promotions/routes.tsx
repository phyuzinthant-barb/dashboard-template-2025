import Route from "@/routes/types";
import PromotionPage from "./pages/PromotionPage";

export const promotionRoutes: Route[] = [
  {
    path: "/promotions",
    element: <PromotionPage />,
  },
];
