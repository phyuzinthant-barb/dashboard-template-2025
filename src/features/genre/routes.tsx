import Route from "@/routes/types";
import GenrePage from "./pages/GenrePage";

export const genreRoutes: Route[] = [
  {
    path: "/genres",
    element: <GenrePage />,
  },
];
