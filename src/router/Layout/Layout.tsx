import { Outlet } from "react-router-dom";
import MobileNavigation from "../../components/MobileNavigation";
import DesktopNavigation from "../../components/DesktopNavigation";
import Header from "../../components/Header";
import { useIsDesktop } from "../../hooks/useIsDesktop";

const Layout = () => {
  const isDesktop = useIsDesktop();

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
