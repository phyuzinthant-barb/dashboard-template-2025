import Route from "@/routes/types";
import CastPage from "./pages/CastPage";

export const castRoutes: Route[] = [
  {
    path: "/casts",
    element: <CastPage />,
  },
];
