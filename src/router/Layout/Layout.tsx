import { Outlet } from "react-router-dom";
import Navigation from "../../components/Navigation";

const Layout = () => {
  return (
    <div style={{ maxHeight: "100dvh" }}>
      <main>
        <Outlet />
      </main>
      <Navigation />
    </div>
  );
};

export default Layout;
