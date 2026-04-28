import Route from "@/routes/types";
import AccountSettingPage from "./pages/AccountSettingPage";
import AccountSettingLayout from "./layout/AccountSettingLayout";
import PasswordSetting from "./pages/ChangePassword";

export const accountSettingRoutes: Route[] = [
  {
    path: "account-setting",
    element: <AccountSettingLayout />,
    subRoutes: [
      {
        path: ":id",
        index: true,
        element: <AccountSettingPage />,
      },
      {
        path: "password/:id",
        element: <PasswordSetting />,
      },
    ],
  },
];
