import Route from "@/routes/types";
import { EmailValidationPage, LoginPage, VerifyOtpPage } from "./pages";

export const authRoutes: Route[] = [
  {
    path: "",
    element: <LoginPage />,
    index: true,
  },
  {
    path: "forgot-password",
    element: <EmailValidationPage />,
  },
  {
    path: "verify-otp",
    element: <VerifyOtpPage />,
  },
];
