import { useNavigate } from "react-router-dom";
import { navigationItems } from "../../router/navigationItems";

import c from "./Navigation.module.scss";

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav className={c.navigation}>
      {navigationItems.map((item) => (
        <button
          className={c.item}
          onClick={() => navigate(item.path)}
          key={item.name}
        >
          <img src={item.icon} alt={`${item.name} icon`} />
          {item.name}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
