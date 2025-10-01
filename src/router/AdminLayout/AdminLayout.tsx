import { Outlet, useNavigate } from "react-router-dom";
import c from "./AdminLayout.module.scss";
import AdminNavButton from "../../components/AdminNavButton";
import { adminNavigationItems } from "../adminNavigationItems";
import AdminPathLocator from "../../components/AdminPathLocator";
import useViewport from "../../hooks/useViewport";
import AdminButton from "../../components/AdminButton";
import { useState } from "react";
import { useAuth } from "../../providers/useAuth";
import AdminLoginPage from "../../pages/AdminLoginPage";

const AdminLayout = () => {
  const viewport = useViewport();
  const navigate = useNavigate();

  const [warningAccepted, setWarningAccepted] = useState(false);
  const authContext = useAuth();

  if (authContext.loading) {
    return null;
  }

  if (!authContext.isAdmin) {
    if (authContext.user) {
      return (
        <div className={c.adminLayout}>
          Nemate ovlasti za pristup ovoj stranici.
        </div>
      );
    } else {
      return <AdminLoginPage />;
    }
  }

  if ((viewport.width < 768 || viewport.height < 600) && !warningAccepted) {
    return (
      <div className={c.mobileWarning}>
        <h1>Upozorenje</h1>
        <p>Stranica za administraciju nije optimizirana za mobilne uređaje.</p>
        <div className={c.buttons}>
          <AdminButton
            variant="secondary"
            onClick={() => {
              navigate("/");
            }}
          >
            Povratak u aplikaciju
          </AdminButton>
          <AdminButton
            onClick={() => {
              setWarningAccepted(true);
            }}
          >
            Svejedno nastavi
          </AdminButton>
        </div>
      </div>
    );
  }

  return (
    <div className={c.adminLayout}>
      <nav className={c.navigation}>
        <div className={c.navigationItems}>
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
        </div>
        <div className={c.userInfo}>
          <h3>{authContext.user?.fullName}</h3>
          <p>{authContext.user?.email}</p>
          <AdminButton
            variant="white"
            onClick={() => {
              authContext.logout();
              navigate("/admin/login");
            }}
          >
            Odjava
          </AdminButton>
        </div>
      </nav>
      <main className={c.main}>
        <AdminPathLocator />
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
