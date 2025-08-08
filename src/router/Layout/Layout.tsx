import { Outlet } from "react-router-dom";
import MobileNavigation from "../../components/MobileNavigation";
import DesktopNavigation from "../../components/DesktopNavigation";
import useViewport from "../../hooks/useViewport";
import Header from "../../components/Header";

const Layout = () => {
  const viewport = useViewport();
  const DESKTOP_WIDTH = 768;
  const isDesktop = viewport.width >= DESKTOP_WIDTH;

  return (
    <div style={{ maxHeight: "100dvh" }}>
      {isDesktop && <DesktopNavigation />}
      <Header />
      <main>
        <Outlet />
      </main>
      {!isDesktop && <MobileNavigation />}
    </div>
  );
};

export default Layout;
