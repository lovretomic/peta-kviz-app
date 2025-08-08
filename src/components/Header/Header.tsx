import { useLocation } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import c from "./Header.module.scss";
import { navigationItems } from "../../router/navigationItems";

const Header = () => {
  const location = useLocation();

  if (
    location.pathname ===
    navigationItems.find((item) => item.name === "Test")?.path
  ) {
    return null;
  }

  const title = navigationItems.find(
    (item) => item.path === location.pathname
  )?.name;

  return (
    <header className={c.header}>
      <img className={c.logo} src={Logo} alt="Logo" />
      <div className={c.separator} />
      <h1 className={c.title}>{title}</h1>
    </header>
  );
};

export default Header;
