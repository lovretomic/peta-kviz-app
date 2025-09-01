import { Outlet } from "react-router-dom";
import c from "./AdminLayout.module.scss";
import AdminNavButton from "../../components/AdminNavButton";
import { adminNavigationItems } from "../adminNavigationItems";

const AdminLayout = () => {
  return (
    <div className={c.adminLayout}>
      <nav className={c.navigation}>
        {adminNavigationItems.map((item) => (
          <AdminNavButton key={item.name} Icon={item.Icon} path={item.path}>
            {item.name}
          </AdminNavButton>
        ))}
      </nav>
      <main className={c.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
