import { Outlet, useNavigate } from "react-router-dom";
import c from "./AdminLayout.module.scss";
import AdminNavButton from "../../components/AdminNavButton";
import { adminNavigationItems } from "../adminNavigationItems";
import AdminPathLocator from "../../components/AdminPathLocator";
import useViewport from "../../hooks/useViewport";
import AdminButton from "../../components/AdminButton";
import { useState } from "react";

const AdminLayout = () => {
  const viewport = useViewport();
  const navigate = useNavigate();

  const [warningAccepted, setWarningAccepted] = useState(false);

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
