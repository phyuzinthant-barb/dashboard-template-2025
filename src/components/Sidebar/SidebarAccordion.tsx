import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { SidebarItem } from "./SidebarItem";
import { SidebarAccordionProps } from "./types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

export function SidebarAccordion({
  icon,
  title,
  items,
  isCollapsed,
  isOpen,
  onToggle,
}: SidebarAccordionProps) {
  const nav = useNavigate();

  if (isCollapsed) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className={cn(
              "flex items-center text-sm 2xl:text-base gap-4 rounded-[4px] px-3 py-2.5 text-white transition-all hover:bg-white/10",
              isOpen &&
                "bg-white/40 text-white border-white border  hover:text-white/80",
              isCollapsed && "justify-center px-2"
            )}
          >
            <Icon width={24} height={24} icon={icon} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-48 space-y-1 ms-6">
          <DropdownMenuLabel>{title}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {items.map((item) => (
              <DropdownMenuItem
                onClick={() => nav(`/${item.path}`)}
                className=" my-1.5"
                key={item.path}
              >
                <span className=" ms-1">{item.title}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Accordion
      type="single"
      value={isOpen ? title : ""}
      onValueChange={(value) => {
        onToggle(value);
      }}
      collapsible
      className="w-full pb-1.5"
    >
      <AccordionItem value={title} className="border-none shadow-none ">
        <AccordionTrigger
          className={cn(
            "flex items-center gap-4 rounded-lg hover:text-white text-sm 2xl:text-base  lg:text-sm p-3 [&[data-state=open]>svg]:rotate-0 font-normal transition-all hover:bg-white/10 text-white hover:no-underline",
            isOpen && "bg-white text-black hover:text-white"
          )}
        >
          <div className=" flex gap-[3.8px]">
            <Icon
              width={24}
              height={24}
              className=" size-5 2xl:size-6"
              icon={icon}
            />
            <span className="flex-1 px-2 text-left">{title}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className=" ms-5 mt-3 border-white space-y-5 border-l-2 py-0 px-0 ">
          {items.map((item) => (
            <SidebarItem
              key={item.path}
              title={item.title}
              isCollapsed={false}
              href={`/${item.path}`}
              className="ml-4 mt-0 shadow-none text-sm 2xl:text-base py-3"
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
