import { Role } from "@/lib/types/roles";
export interface Badge {
  text: string;
  className: string;
}
export interface MenuItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: Badge;
  children?: MenuItem[];
  group?: string;
  roles?: Role[];
}
