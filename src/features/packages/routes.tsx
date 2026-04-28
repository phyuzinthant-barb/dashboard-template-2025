import Route from "@/routes/types";
import PackagePage from "./pages/PackagePage";

export const packageRoutes: Route[] = [
  {
    path: "/packages",
    element: <PackagePage />,
  },
];
