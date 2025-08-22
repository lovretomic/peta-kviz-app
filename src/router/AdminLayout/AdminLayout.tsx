import { Outlet } from "react-router-dom";
import c from "./AdminLayout.module.scss";
import AdminNavButton from "../../components/AdminNavButton";
import { useState } from "react";

const AdminLayout = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  function handleMouseMove(event: React.MouseEvent) {
    setX(event.clientX - 8);
    setY(event.clientY);
  }

  return (
    <div className={c.adminLayout} onMouseMove={handleMouseMove}>
      <nav className={c.navigation}>
        <div className={c.left}>
          <AdminNavButton>Admin</AdminNavButton>
          <AdminNavButton>Kviz</AdminNavButton>
          <AdminNavButton>Prijave</AdminNavButton>
          <p className={c.debugInfo}>{`X: ${x}, Y: ${y}`}</p>
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
