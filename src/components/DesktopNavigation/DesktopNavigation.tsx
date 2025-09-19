import { navigationItems } from "../../router/navigationItems";
import NavigationButton from "../NavigationButton/NavigationButton";
import c from "./DesktopNavigation.module.scss";
import ClickableLogo from "../ClickableLogo";

const DesktopNavigation = () => {
  return (
    <nav className={c.desktopNavigation}>
      <div className={c.logos}>
        <ClickableLogo className={c.logo} />
        <ClickableLogo Meshgrid className={c.logo} />
      </div>
      <div className={c.navigationItems}>
        {navigationItems.map((item) => (
          <NavigationButton key={item.name} item={item} isDesktop />
        ))}
      </div>
    </nav>
  );
};

export default DesktopNavigation;
