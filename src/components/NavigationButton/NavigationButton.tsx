import { useLocation, useNavigate } from "react-router-dom";
import type { NavigationItem } from "../../router/navigationItems";
import c from "./NavigationButton.module.scss";
import clsx from "clsx";
import { useState, useEffect } from "react";

type NavigationItemProps = {
  item: NavigationItem;
  isDesktop?: boolean;
};

const NavigationButton = ({ item, isDesktop = false }: NavigationItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (clickCount === 5 && item.path === "/application") {
      navigate("/umra");
      setClickCount(0);
      return;
    }

    if (clickCount > 0) {
      const timer = setTimeout(() => {
        setClickCount(0);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [clickCount, item.path, navigate]);

  const handleClick = () => {
    if (item.path === "/application") {
      setClickCount((prev) => prev + 1);
      if (clickCount < 5) {
        navigate(item.path);
      }
    } else {
      navigate(item.path);
    }
  };

  return (
    <button
      className={clsx(
        { [c.active]: location.pathname === item.path, [c.desktop]: isDesktop },
        c.button
      )}
      onClick={handleClick}
      key={item.name}
    >
      <img src={item.icon} alt={`${item.name} icon`} />
      {item.name}
    </button>
  );
};

export default NavigationButton;
