import { Outlet } from "react-router-dom";
import c from "./AdminLayout.module.scss";
import AdminNavButton from "../../components/AdminNavButton";

const AdminLayout = () => {
  return (
    <div className={c.adminLayout}>
      <nav className={c.navigation}>
        <div className={c.left}>
          <AdminNavButton>Admin</AdminNavButton>
          <AdminNavButton>Kviz</AdminNavButton>
          <AdminNavButton>Prijave</AdminNavButton>
        </div>
        <div className={c.right}>
          <p>Administrator</p>
          <AdminNavButton>Odjavi se</AdminNavButton>
        </div>
      </nav>
      <main className={c.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
