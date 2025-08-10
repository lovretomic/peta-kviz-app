import { useLocation } from "react-router-dom";
import c from "./Header.module.scss";
import { navigationItems } from "../../router/navigationItems";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import ClickableLogo from "../ClickableLogo";

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
    <header className={c.header}>
      {!isDesktop && (
        <>
          <ClickableLogo className={c.logo} />
          <div className={c.separator} />
        </>
      )}
      <h1 className={c.title}>{title}</h1>
    </header>
  );
};

export default Header;
