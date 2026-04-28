import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SidebarItemProps } from "./types";
import { Icon } from "@iconify/react";

export function SidebarItem({
  icon,
  title,
  isCollapsed,
  href,
  className,
  isActive = href ? location.pathname === href : false,
}: SidebarItemProps) {
  const content = (
    <div
      className={cn(
        "flex items-center gap-2.5 text-sm 2xl:text-base rounded-lg px-3 py-3 text-white transition-all hover:bg-white/10",
        isActive &&
          "bg-white/10 text-white border-white border hover:text-white/80",
        isCollapsed && "justify-center px-2",
        className
      )}
    >
      <Icon width={24} height={24} icon={icon} className=" size-5 2xl:size-6" />
      {!isCollapsed && <span>{title}</span>}
    </div>
  );

  const wrappedContent = href ? (
    <Link to={href} className="block w-full">
      {content}
    </Link>
  ) : (
    <></>
  );

  return wrappedContent;
}
