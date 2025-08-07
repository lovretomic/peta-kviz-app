import { useNavigate } from "react-router-dom";
import type { NavigationItem } from "../../router/navigationItems";
import c from "./NavigationButton.module.scss";
import clsx from "clsx";

type NavigationItemProps = {
  item: NavigationItem;
  isDesktop?: boolean;
};

const NavigationButton = ({ item, isDesktop = false }: NavigationItemProps) => {
  const navigate = useNavigate();
  const route = window.location.pathname;

  return (
    <button
      className={clsx(
        { [c.active]: route === item.path, [c.desktop]: isDesktop },
        c.button
      )}
      onClick={() => navigate(item.path)}
      key={item.name}
    >
      <img src={item.icon} alt={`${item.name} icon`} />
      {item.name}
    </button>
  );
};

export default NavigationButton;
