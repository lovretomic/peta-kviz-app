import { navigationItems } from "../../router/navigationItems";

import c from "./MobileNavigation.module.scss";
import NavigationButton from "../NavigationButton/NavigationButton";

const MobileNavigation = () => {
  return (
    <nav className={c.navigation}>
      {navigationItems.map((item) => (
        <NavigationButton key={item.name} item={item} />
      ))}
    </nav>
  );
};

export default MobileNavigation;
