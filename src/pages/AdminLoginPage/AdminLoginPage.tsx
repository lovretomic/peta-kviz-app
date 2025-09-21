import Button from "../../components/Button";
import ClickableLogo from "../../components/ClickableLogo";
import GoogleLogoIcon from "../../assets/icons/google-logo.svg";
import c from "./AdminLoginPage.module.scss";
import { useAuth } from "../../providers/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminLoginPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user && auth.isAdmin) {
      navigate("/admin");
    }
  }, [auth.user, auth.isAdmin, navigate]);

  if (!auth || auth.loading) return null;

  return (
    <div className={c.pageWrapper}>
      <div className={c.contentWrapper}>
        <div className={c.logoHeader}>
          <ClickableLogo />
          <hr />
          <h2>Prijava voditelja</h2>
        </div>
        <div className={c.formWrapper}>
          <Button
            icon={GoogleLogoIcon}
            iconPosition="left"
            onClick={() => {
              auth.loginWithGoogle();
            }}
          >
            Prijavi se s Googleom
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
