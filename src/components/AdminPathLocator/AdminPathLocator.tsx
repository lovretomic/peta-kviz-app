import { adminNavigationItems } from "../../router/adminNavigationItems";
import c from "./AdminPathLocator.module.scss";

const AdminPathLocator = () => {
  const parts = window.location.pathname.split("/");

  return (
    <nav className={c.adminPathLocator}>
      {parts.map((part, i) => {
        const item = adminNavigationItems.find(
          (item) => item.path === `/${part}`
        );
        return (
          <a key={i} href={`/${parts.slice(1, i + 1).join("/")}`}>
            {item ? item.name : part || "Home"}
          </a>
        );
      })}
    </nav>
  );
};

export default AdminPathLocator;
