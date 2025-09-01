import { adminNavigationItems } from "../../router/adminNavigationItems";
import c from "./AdminPathLocator.module.scss";
import ChevronRightIcon from "../../assets/icons/chevron-right.svg?react";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const AdminPathLocator = () => {
  const navigate = useNavigate();

  function getParts() {
    const split = window.location.pathname.split("/").filter((part) => part);
    const parts = [];
    for (let i = 0; i < split.length; i++) {
      const partial = "/" + split.slice(0, i + 1).join("/");
      const item = adminNavigationItems.find((item) => item.path === partial);
      if (item) {
        parts.push(item);
      } else {
        parts.push({ name: split.at(i), path: partial });
      }
    }

    return parts;
  }

  return (
    <nav className={c.adminPathLocator}>
      {getParts().map((part, i) => {
        return (
          <Fragment key={i}>
            <button
              key={i}
              onClick={() => navigate(part.path)}
              className={c.pathPart}
              disabled={part.path === window.location.pathname}
            >
              {part.name}
            </button>
            {i < getParts().length - 1 && (
              <ChevronRightIcon className={c.chevron} key={i + "-icon"} />
            )}
          </Fragment>
        );
      })}
    </nav>
  );
};

export default AdminPathLocator;
