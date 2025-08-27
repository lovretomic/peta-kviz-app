import Button from "../../components/Button";
import ClickableLogo from "../../components/ClickableLogo";
import Input from "../../components/Input";
import c from "./AdminLoginPage.module.scss";

const AdminLoginPage = () => {
  return (
    <div className={c.pageWrapper}>
      <div className={c.contentWrapper}>
        <div className={c.logoHeader}>
          <ClickableLogo />
          <hr />
          <h2>Prijava voditelja</h2>
        </div>
        <div className={c.formWrapper}>
          <Input placeholder="Upiši oznaku voditelja" />
          <Input placeholder="Upiši lozinku" type="password" />
          <Button>Prijavi se</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
