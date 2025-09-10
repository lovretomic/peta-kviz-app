import { Outlet } from "react-router-dom";
import c from "./AdminLayout.module.scss";
import AdminNavButton from "../../components/AdminNavButton";
import { adminNavigationItems } from "../adminNavigationItems";
import AdminPathLocator from "../../components/AdminPathLocator";

const AdminLayout = () => {
  return (
    <div className={c.adminLayout}>
      <nav className={c.navigation}>
        {adminNavigationItems.map((item) => (
          <AdminNavButton
            key={item.name}
            Icon={item.Icon}
            path={item.path}
            disabled={item.disabled}
          >
            {item.name}
          </AdminNavButton>
        ))}
      </nav>
      <main className={c.main}>
        <AdminPathLocator />
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
