import { Outlet } from "react-router-dom";
import MobileNavigation from "../../components/MobileNavigation";
import DesktopNavigation from "../../components/DesktopNavigation";
import Header from "../../components/Header";
import { useIsDesktop } from "../../hooks/useIsDesktop";

import c from "./Layout.module.scss";

const Layout = () => {
  const isDesktop = useIsDesktop();

  return (
    <div className={c.layout}>
      {isDesktop && <DesktopNavigation />}
      <Header />
      <main className={c.main}>
        <Outlet />
      </main>
      {!isDesktop && <MobileNavigation />}
    </div>
  );
};

export default Layout;
