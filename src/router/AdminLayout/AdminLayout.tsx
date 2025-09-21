import { Outlet, useNavigate } from "react-router-dom";
import c from "./AdminLayout.module.scss";
import AdminNavButton from "../../components/AdminNavButton";
import { adminNavigationItems } from "../adminNavigationItems";
import AdminPathLocator from "../../components/AdminPathLocator";
import useViewport from "../../hooks/useViewport";
import AdminButton from "../../components/AdminButton";
import { useEffect, useState } from "react";
import { useAuth } from "../../providers/useAuth";

const AdminLayout = () => {
  const viewport = useViewport();
  const navigate = useNavigate();

  const [warningAccepted, setWarningAccepted] = useState(false);
  const auth = useAuth();

  console.log(auth);

  useEffect(() => {
    if (!auth.user && !auth.loading) {
      auth.loginWithGoogle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user, auth.loading]);

  if (!auth.user || auth.user.fullName === "") {
    return <div className={c.adminLayout}>Učitavanje...</div>;
  }

  if (auth.loading) {
    return <div className={c.adminLayout}>Učitavanje...</div>;
  }

  if (!auth.isAdmin) {
    return (
      <div className={c.adminLayout}>
        Nemate ovlasti za pristup ovoj stranici.
      </div>
    );
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
        <button onClick={() => auth.logout()}>Odjava</button>
      </nav>
      <main className={c.main}>
        <AdminPathLocator />
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
