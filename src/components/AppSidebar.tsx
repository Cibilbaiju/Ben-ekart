
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, Tv, Waves, Refrigerator, Microwave, Wind, Offers, User, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Televisions", url: "#", icon: Tv },
  { title: "Washing Machines", url: "#", icon: Waves },
  { title: "Refrigerators", url: "#", icon: Refrigerator },
  { title: "Microwaves", url: "#", icon: Microwave },
  { title: "Air Conditioners", url: "#", icon: Wind },
  { title: "Offers", url: "/offers", icon: Offers },
  { title: "Account", url: "/account", icon: User },
  { title: "Cart", url: "/cart", icon: ShoppingCart },
];

export function AppSidebar() {
  return (
    <Sidebar className="fixed left-0 top-0 h-screen w-56 bg-background border-r border-border z-30 dark:bg-background">
      <SidebarContent className="py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 mb-2 text-muted-foreground">Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-muted transition">
                      <item.icon size={20} />
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
