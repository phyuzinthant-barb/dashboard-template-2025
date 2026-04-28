import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SidebarContext } from "./SidebarContext";
import { SidebarContent } from "./SidebarContent";
import { SidebarProps } from "./types";
import logo from "../../assets/images/logo.svg";

export function Sidebar({ defaultCollapsed = false }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1279) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <SidebarContext.Provider
      value={{ isCollapsed, activeAccordion, setActiveAccordion }}
    >
      <div
        className={cn(
          "relative flex flex-col bg-primary h-screen border-r text-white border-gray-200 p-4 transition-all duration-300",
          isCollapsed ? "w-28" : "w-72"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 z-20 top-6 h-8 w-8 rounded-full border border-gray-200 bg-white dark:border-gray-800 "
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <ChevronLeft
            className={cn(
              "h-5 w-5 me-1 text-black transition-all",
              isCollapsed && "rotate-180"
            )}
          />
        </Button>

        <div className="flex items-center justify-center h-16 gap-2 py-12 mb-8">
          {!isCollapsed && (
            <div className=" rounded-2xl cursor-pointer  flex justify-center items-center ">
              <img src={logo} className=" w-full" />
            </div>
          )}
        </div>

        <SidebarContent />
      </div>
    </SidebarContext.Provider>
  );
}
