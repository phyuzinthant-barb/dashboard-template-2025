import Route from "@/routes/types";
import AuditLogPage from "./pages/AuditLogPage";

export const auditLogRoutes: Route[] = [
  {
    path: "/reporting/audit-logs",
    element: <AuditLogPage />,
  },
];
