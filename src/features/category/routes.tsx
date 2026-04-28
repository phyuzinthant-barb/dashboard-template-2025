import Route from "@/routes/types";
import CategoryPage from "./pages/CategoryPage";

export const categoryRoutes: Route[] = [
  {
    path: "/categories",
    element: <CategoryPage />,
  },
];
