import {} from "../../hooks/useIsDesktop";
import { navigationItems } from "../../router/navigationItems";
import NavigationButton from "../NavigationButton/NavigationButton";
import c from "./DesktopNavigation.module.scss";
import Logo from "../../assets/logo.svg";

const DesktopNavigation = () => {
  return (
    <nav className={c.desktopNavigation}>
      <img className={c.logo} src={Logo} />
      {navigationItems.map((item) => (
        <NavigationButton key={item.name} item={item} isDesktop />
      ))}
    </nav>
  );
};

export default DesktopNavigation;
