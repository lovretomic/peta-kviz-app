import Button from "../../components/Button";
import Input from "../../components/Input";
import MemberList from "../../components/MemberList";
import ProgressBar from "../../components/ProgressBar";
import c from "./ApplicationForm.module.scss";

const ApplicationForm = () => {
  return (
    <>
      <div className={c.ellipse} />
      <div className={c.container}>
        <ProgressBar
          percentage={50}
          label="Kviz općeg znanja"
          date={new Date()}
        />
        <h2>Prijava ekipe</h2>
        <div className={c.scroller}>
          <Input
            placeholder="Upiši ime ekipe"
            style={{ marginBottom: "24px" }}
          />
          <p>Informacije o kapetanu</p>
          <div className={c.inputGroup}>
            <Input placeholder="Upiši ime i prezime kapetana" />
            <Input placeholder="Upiši e-adresu kapetana" />
          </div>

          <MemberList captainName="Ime kapetana" members={[]} />
        </div>
        <Button variant="primary" className={c.submitButton}>
          Pošalji prijavu
        </Button>
      </div>
    </>
  );
};

export default ApplicationForm;
