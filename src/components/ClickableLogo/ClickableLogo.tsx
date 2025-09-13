import { clsx } from "clsx";
import Logo from "../../assets/logo.svg";
import MeshgridLogo from "../../assets/meshgrid.svg";
import c from "./ClickableLogo.module.scss";

type ClickableLogoProps = {
  Meshgrid?: boolean;
} & React.HTMLAttributes<HTMLImageElement>;

const ClickableLogo: React.FC<ClickableLogoProps> = ({
  Meshgrid = false,
  ...props
}) => {
  return (
    <img
      {...props}
      className={clsx(c.clickableLogo, props.className)}
      src={Meshgrid ? MeshgridLogo : Logo}
      alt="Logo"
      onClick={() =>
        window.open(
          Meshgrid
            ? "https://linktr.ee/meshgrid"
            : "https://www.instagram.com/peta_kviz/",
          "_blank",
          "noopener,noreferrer"
        )
      }
    />
  );
};

export default ClickableLogo;
