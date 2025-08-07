import { navigationItems } from "../../router/navigationItems";
import NavigationButton from "../NavigationButton/NavigationButton";
import c from "./DesktopNavigation.module.scss";

const DesktopNavigation = () => {
  return (
    <nav className={c.desktopNavigation}>
      {navigationItems.map((item) => (
        <NavigationButton key={item.name} item={item} />
      ))}
    </nav>
  );
};

export default DesktopNavigation;
