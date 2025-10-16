import {
  MenuConfig,
  type SidebarMenuItem,
} from "@/components/Layout/MenuConfig";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Helper function to find menu item by path
const findMenuItemByPath = (
  items: SidebarMenuItem[],
  path: string
): SidebarMenuItem | null => {
  for (const item of items) {
    if (item.path === path) {
      return item;
    }
    if (item.children) {
      const found = findMenuItemByPath(item.children, path);
      if (found) return found;
    }
  }
  return null;
};

// Hook to automatically set document title based on route
export const useRouteHelmet = () => {
  const location = useLocation();

  useEffect(() => {
    const menuItem = findMenuItemByPath(MenuConfig, location.pathname);

    if (menuItem?.helmet?.title) {
      document.title = menuItem.helmet.title;
    }

    // Set description meta tag
    if (menuItem?.helmet?.description) {
      let descriptionMeta = document.querySelector('meta[name="description"]');

      if (!descriptionMeta) {
        descriptionMeta = document.createElement("meta");
        descriptionMeta.setAttribute("name", "description");
        document.head.appendChild(descriptionMeta);
      }

      descriptionMeta.setAttribute("content", menuItem.helmet.description);
    }
  }, [location.pathname]);
};
