import { Outlet } from "react-router-dom";
import c from "./AdminLayout.module.scss";

const AdminLayout = () => {
  return (
    <div className={c.adminLayout}>
      <nav className={c.navigation}>
        <div className={c.left}></div>
        <div className={c.right}></div>
      </nav>
      <main className={c.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
