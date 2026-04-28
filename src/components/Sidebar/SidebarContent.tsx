import { useNavigate, useLocation } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { SidebarItem } from "./SidebarItem";
import { SidebarAccordion } from "./SidebarAccordion";
import { useSidebar } from "./SidebarContext";
import { menuItems } from "./SidebarMenuItems";

export function SidebarContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isCollapsed, activeAccordion, setActiveAccordion } = useSidebar();

  const handleSingleItemClick = useCallback(
    (path: string) => {
      setActiveAccordion(null);
      navigate(path);
    },
    [navigate, setActiveAccordion]
  );

  const handleAccordionToggle = useCallback(
    (value: string) => {
      setActiveAccordion(value === activeAccordion ? null : value);
    },
    [activeAccordion, setActiveAccordion]
  );

  const renderedItems = useMemo(
    () =>
      menuItems.map((item) =>
        item.items.length === 0 ? (
          <div
            key={item.path}
            onClick={() => handleSingleItemClick(item.path)}
            role="button"
            tabIndex={0}
            className="outline-none focus:ring-2 focus:ring-primary rounded-lg"
          >
            <SidebarItem
              icon={item.icon}
              title={item.title}
              isCollapsed={isCollapsed}
              href={item.path}
              isActive={
                item.path === "/"
                  ? location.pathname === `${item.path}`
                  : location.pathname === `/${item.path}`
              }
            />
          </div>
        ) : (
          <SidebarAccordion
            key={item.path}
            icon={item.icon}
            title={item.title}
            items={item.items}
            isCollapsed={isCollapsed}
            isOpen={activeAccordion === item.title}
            onToggle={handleAccordionToggle}
          />
        )
      ),
    [
      isCollapsed,
      activeAccordion,
      location.pathname,
      handleSingleItemClick,
      handleAccordionToggle,
    ]
  );

  return (
    <div className="flex flex-col h-full overflow-auto scroll-container">
      <div className=" flex flex-col gap-2">{renderedItems}</div>
    </div>
  );
}
