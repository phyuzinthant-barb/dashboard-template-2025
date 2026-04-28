import Route from "@/routes/types";
import CollectionPage from "./pages/CollectionsPage";

export const collectionRoutes: Route[] = [
  {
    path: "/collections",
    element: <CollectionPage />,
  },
];
