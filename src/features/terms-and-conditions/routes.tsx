import Route from "@/routes/types";
import TermsPage from "./pages/TermsPage";

export const termsRoutes: Route[] = [
  {
    path: "terms-and-conditions",
    element: <TermsPage />,
  },
];
