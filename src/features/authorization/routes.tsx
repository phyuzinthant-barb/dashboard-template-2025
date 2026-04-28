import Route from "@/routes/types";
import { AdminPage, AddAdminPage, EditAdminPage } from "./pages/admin";
import {
  AdminRolesListPage,
  AddNewRolePage,
  EditAdminRolePage,
  AdminRoleDetailPage,
} from "./pages/roles";

export const authorizationRoutes: Route[] = [
  {
    path: "/admin-list",
    element: <AdminPage />,
  },
  {
    path: "/admin-list/add",
    element: <AddAdminPage />,
  },
  {
    path: "/admin-list/edit/:id",
    element: <EditAdminPage />,
  },
  {
    path: "/admin/roles",
    element: <AdminRolesListPage />,
  },
  {
    path: "/admin/roles/add",
    element: <AddNewRolePage />,
  },
  {
    path: "/admin/roles/edit/:id",
    element: <EditAdminRolePage />,
  },
  {
    path: "/admin/roles/detail/:id",
    element: <AdminRoleDetailPage />,
  },
];
