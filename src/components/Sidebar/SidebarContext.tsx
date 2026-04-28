import { createContext, useContext } from "react";
import { SidebarContextType } from "./types";

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined
);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
