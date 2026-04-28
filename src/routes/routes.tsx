import { authRoutes } from "@/features/auth/routes";
import Route from "./types";
import AppLayout from "@/layout/AppLayout";
import { dashboardRoutes } from "@/features/dashboard/routes";
import AuthLayout from "@/layout/AuthLayout";
import { videoRoutes } from "@/features/videos/routes";
import { categoryRoutes } from "@/features/category/routes";
import { genreRoutes } from "@/features/genre/routes";
import { roleRoutes } from "@/features/role/routes";
import { castRoutes } from "@/features/cast/routes";
import { bannerRoutes } from "@/features/banner/routes";
import { adsRoutes } from "@/features/ads/routes";
import { packageRoutes } from "@/features/packages/routes";
import { promotionRoutes } from "@/features/promotions/routes";
import { announcementRoutes } from "@/features/announcement/routes";
import { authorizationRoutes } from "@/features/authorization/routes";
import { faqRoutes } from "@/features/faq/routes";
import { termsRoutes } from "@/features/terms-and-conditions/routes";
import { policyRoutes } from "@/features/privacy-policy/routes";
import { accountSettingRoutes } from "@/features/profile/routes";
import { reminderRoutes } from "@/features/reminder/routes";
import { customerRoutes } from "@/features/customers/routes";
import { collectionRoutes } from "@/features/collection/routes";
import { transactionRoutes } from "@/features/transactions/routes";
import { userLogRoutes } from "@/features/user-logs/routes";
import { auditLogRoutes } from "@/features/audit-logs/routes";

export const routes: Route[] = [
  {
    path: "/",
    element: <AppLayout />,
    subRoutes: [
      ...dashboardRoutes,
      ...videoRoutes,
      ...categoryRoutes,
      ...genreRoutes,
      ...roleRoutes,
      ...castRoutes,
      ...bannerRoutes,
      ...adsRoutes,
      ...packageRoutes,
      ...promotionRoutes,
      ...announcementRoutes,
      ...authorizationRoutes,
      ...faqRoutes,
      ...termsRoutes,
      ...policyRoutes,
      ...accountSettingRoutes,
      ...reminderRoutes,
      ...customerRoutes,
      ...collectionRoutes,
      ...transactionRoutes,
      ...userLogRoutes,
      ...auditLogRoutes,
    ],
  },
  {
    path: "/login",
    element: <AuthLayout />,
    subRoutes: [...authRoutes],
  },
];
