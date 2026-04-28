import Route from "@/routes/types";
import TransactionPage from "./pages/TransactionPage";

export const transactionRoutes: Route[] = [
  {
    path: "/transactions",
    element: <TransactionPage />,
  },
];
