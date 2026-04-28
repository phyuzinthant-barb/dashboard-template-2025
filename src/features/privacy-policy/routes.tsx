import Route from "@/routes/types";
import PolicyPage from "./pages/PolicyPage";

export const policyRoutes: Route[] = [
  {
    path: "privacy-policy",
    element: <PolicyPage />,
  },
];
