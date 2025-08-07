import { Outlet } from "react-router-dom";
import MobileNavigation from "../../components/MobileNavigation";
import DesktopNavigation from "../../components/DesktopNavigation";

const Layout = () => {
  return (
    <div style={{ maxHeight: "100dvh" }}>
      <DesktopNavigation />
      <main>
        <Outlet />
      </main>
      <MobileNavigation />
    </div>
  );
};

export default Layout;
