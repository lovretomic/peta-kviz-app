import { navigationItems } from "../../router/navigationItems";
import NavigationButton from "../NavigationButton/NavigationButton";
import c from "./DesktopNavigation.module.scss";
import ClickableLogo from "../ClickableLogo";

const DesktopNavigation = () => {
  return (
    <nav className={c.desktopNavigation}>
      <ClickableLogo className={c.logo} />
      {navigationItems.map((item) => (
        <NavigationButton key={item.name} item={item} isDesktop />
      ))}
    </nav>
  );
};

export default DesktopNavigation;
