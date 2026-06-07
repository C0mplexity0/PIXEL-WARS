import { EventHandler, type Listener } from "@pixel-wars/utils";
import type { Menu } from "../ui/App.vue";

export type MenuDetails = {
  menu?: Menu;
  loadingMessage?: string;
  errorMessage?: string;
};

const menuDetailsChangedEventHandler = new EventHandler<MenuDetails>();

export function changeMenuDetails(details: MenuDetails) {
  menuDetailsChangedEventHandler.fire(details);
}

export function onMenuDetailsChanged(listener: Listener<MenuDetails>) {
  menuDetailsChangedEventHandler.addListener(listener);
  return {
    disconnect() {
      menuDetailsChangedEventHandler.removeListener(listener);
    },
  };
}
