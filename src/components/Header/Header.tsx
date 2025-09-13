import { useLocation } from "react-router-dom";
import c from "./Header.module.scss";
import { navigationItems } from "../../router/navigationItems";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import ClickableLogo from "../ClickableLogo";
import clsx from "clsx";

const Header = () => {
  const location = useLocation();
  const isDesktop = useIsDesktop();

  if (location.pathname === "/test") {
    return null;
  }

  const title = navigationItems.find(
    (item) => item.path === location.pathname
  )?.name;

  return (
    <header className={clsx(c.header, { [c.isDesktop]: isDesktop })}>
      <h1 className={c.title}>{title}</h1>

      {!isDesktop && (
        <div className={c.logos}>
          <ClickableLogo className={c.logo} />
          <ClickableLogo meshgrid className={c.logo} />
        </div>
      )}
    </header>
  );
};

export default Header;
