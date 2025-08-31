import { Outlet } from "react-router-dom";
import c from "./AdminLayout.module.scss";
import AdminNavButton from "../../components/AdminNavButton";

const AdminLayout = () => {
  return (
    <div className={c.adminLayout}>
      <nav className={c.navigation}>
        <h3>
          <span>Peta Kviz App</span> Admin
        </h3>
        <AdminNavButton>Admin</AdminNavButton>
        <AdminNavButton>Kviz</AdminNavButton>
        <AdminNavButton>Prijave</AdminNavButton>
      </nav>
      <main className={c.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
