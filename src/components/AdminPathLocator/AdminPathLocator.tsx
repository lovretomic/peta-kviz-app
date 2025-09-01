import { adminNavigationItems } from "../../router/adminNavigationItems";
import c from "./AdminPathLocator.module.scss";
import ChevronRightIcon from "../../assets/icons/chevron-right.svg?react";
import { useNavigate } from "react-router-dom";

const AdminPathLocator = () => {
  const parts = window.location.pathname.split("/");
  const navigate = useNavigate();

  return (
    <nav className={c.adminPathLocator}>
      {parts.map((part, i) => {
        const item = adminNavigationItems.find(
          (item) => item.path === `/${part}`
        );
        return (
          <>
            <button
              key={i}
              onClick={() => navigate(`/${parts.slice(1, i + 1).join("/")}`)}
              className={c.pathPart}
            >
              {item ? item.name : part || "Home"}
            </button>
            {i < parts.length - 1 && <ChevronRightIcon className={c.chevron} />}
          </>
        );
      })}
    </nav>
  );
};

export default AdminPathLocator;
