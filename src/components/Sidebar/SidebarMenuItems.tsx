export const menuItems = [
  {
    path: "/",
    title: "Dashboard",
    icon: "mdi:view-grid-outline",
    items: [],
  },
  {
    path: "video",
    title: "Video",
    icon: "bx:movie-play",
    items: [
      { path: "video-list", title: "Video List" },
      { path: "categories", title: "Category" },
      { path: "genres", title: "Genre" },
      { path: "casts", title: "Cast" },
      { path: "roles", title: "Role" },
      { path: "collections", title: "Collection" },
      // { path: "view-counts", title: "View Count" },
    ],
  },
  {
    path: "package",
    title: "Package",
    icon: "stash:plan-light",
    items: [
      { path: "packages", title: "Subscription Plan" },
      { path: "promotions", title: "Promotion" },
    ],
  },
  {
    path: "transactions",
    title: "Transaction",
    icon: "hugeicons:invoice",
    items: [],
  },
  {
    path: "announcement",
    title: "Announcement",
    icon: "mingcute:announcement-line",
    items: [],
  },
  {
    path: "reporting",
    title: "Reporting",
    icon: "oui:app-reporting",
    items: [
      // { path: "reporting/videos", title: "Uploaded Videos" },
      // { path: "reporting/view-count", title: "View Count" },
      { path: "reporting/user-logs", title: "User Logs" },
      { path: "reporting/audit-logs", title: "Audit Logs" },
    ],
  },
  {
    path: "content",
    title: "Content",
    icon: "mingcute:ai-line",
    items: [
      { path: "faq", title: "FAQ" },
      { path: "terms-and-conditions", title: "T&C" },
      { path: "privacy-policy", title: "Privacy Policy" },
    ],
  },
  {
    path: "admin",
    title: "Admin",
    icon: "clarity:administrator-line",
    items: [
      { path: "admin-list", title: "Admin List" },
      { path: "admin/roles", title: "Roles" },
    ],
  },
  {
    path: "setting",
    title: "Setting",
    icon: "material-symbols:settings-rounded",
    items: [
      // {
      //   path: "smtp",
      //   title: "SMTP",
      // },
      {
        path: "reminder",
        title: "Reminder",
      },
    ],
  },
];
