export interface MenuItem {
  path: string;
  title: string;
  icon?: any;
  href?: string;
  items?: any;
}

export interface MenuGroup {
  path: string;
  title: string;
  icon: any;
  items: MenuItem[];
}

export interface SidebarItemProps {
  icon?: any;
  title: string;
  isCollapsed: boolean;
  isActive?: boolean;
  href?: string;
  className?: string;
  items?: any;
}

export interface SidebarAccordionProps {
  icon: any;
  title: string;
  items: MenuItem[];
  isCollapsed: boolean;
  isOpen: boolean;
  onToggle: (value: string) => void;
}

export interface SidebarContextType {
  isCollapsed: boolean;
  activeAccordion: string | null;
  setActiveAccordion: (value: string | null) => void;
}

export interface SidebarProps {
  defaultCollapsed?: boolean;
}
