import Route from "@/routes/types";
import CustomerPage from "./pages/CustomerPage";
import BanCustomerPage from "./pages/BanCustomerPage";

export const customerRoutes: Route[] = [
  {
    path: "/customer-list",
    element: <CustomerPage />,
  },
  {
    path: "/banned-customer-list",
    element: <BanCustomerPage />,
  },
];
