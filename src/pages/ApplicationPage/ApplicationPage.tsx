import Hourglass from "../../assets/icons/hourglass.svg";
import c from "./ApplicationPage.module.css";

const ApplicationPage = () => {
  return (
    <div className={c.container}>
      <img src={Hourglass} alt="Pješčani sat" />
      <h2>Ima još vremena.</h2>
      <p>
        Kvizevi se održavaju svakog posljednjeg petka u mjesecu. Prijave se
        otvaraju nekoliko dana prije kviza.
      </p>
    </div>
  );
};

export default ApplicationPage;
