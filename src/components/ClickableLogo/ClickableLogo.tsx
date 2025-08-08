import { clsx } from "clsx";
import Logo from "../../assets/logo.svg";
import c from "./ClickableLogo.module.scss";

const ClickableLogo = (props: React.HTMLAttributes<HTMLImageElement>) => {
  return (
    <img
      {...props}
      className={clsx(c.clickableLogo, props.className)}
      src={Logo}
      alt="Logo"
      onClick={() => window.open("https://www.instagram.com/peta_kviz/")}
    />
  );
};

export default ClickableLogo;
