import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import MemberList from "../../components/MemberList";
import ProgressBar from "../../components/ProgressBar";
import c from "./ApplicationForm.module.scss";
import clsx from "clsx";

type Application = {
  teamName: string;
  captainName: string;
  captainEmail: string;
  members: string[];
  appliedAt: Date;
};

const ApplicationForm = () => {
  const [application, setApplication] = useState<Application | null>(null);
  const memberListDisabled =
    !application?.teamName ||
    !application?.captainName ||
    !application?.captainEmail;

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
        <Input
          placeholder="Upiši ime ekipe"
          style={{ marginBottom: "24px" }}
          value={application?.teamName || ""}
          onChange={(e) =>
            setApplication({
              ...application,
              teamName: e.target.value as string,
            } as Application)
          }
        />
        <p>Informacije o kapetanu</p>
        <div className={c.inputGroup}>
          <Input
            placeholder="Upiši ime i prezime kapetana"
            value={application?.captainName || ""}
            onChange={(e) =>
              setApplication({
                ...application,
                captainName: e.target.value as string,
              } as Application)
            }
          />
          <Input
            placeholder="Upiši e-adresu kapetana"
            value={application?.captainEmail || ""}
            onChange={(e) =>
              setApplication({
                ...application,
                captainEmail: e.target.value as string,
              } as Application)
            }
          />
        </div>

        <MemberList
          disabled={memberListDisabled}
          className={clsx({
            [c.memberList]: true,
            [c.disabled]: memberListDisabled,
          })}
          captainName={application?.captainName || ""}
          members={application?.members || []}
          addMember={(name) =>
            setApplication({
              ...application,
              members: [...(application?.members || []), name],
            } as Application)
          }
          removeMember={(name) =>
            setApplication({
              ...application,
              members: (application?.members || []).filter((m) => m !== name),
            } as Application)
          }
          maxMembers={5}
        />
        <Button
          variant="primary"
          className={c.submitButton}
          disabled={memberListDisabled}
          onClick={() => {
            setApplication({
              ...application,
              appliedAt: new Date(),
            } as Application);
            console.log("Application submitted:", application);
          }}
        >
          Pošalji prijavu
        </Button>
      </div>
    </>
  );
};

export default ApplicationForm;
