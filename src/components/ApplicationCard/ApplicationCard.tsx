import MemberNumberIndicator from "../MemberNumberIndicator";
import c from "./ApplicationCard.module.scss";

import StarIcon from "../../assets/icons/star.svg?react";
import PersonIcon from "../../assets/icons/person.svg?react";
import clsx from "clsx";

import WarningIcon from "../../assets/icons/warning.svg?react";

export type Team = {
  name: string;
  captainName: string;
  captainEmail: string;
  members: string[];
};

type ApplicationCardProps = {
  team: Team;
  action: "complete" | "edit" | "reapply";
};

const ApplicationCard = ({ team, action }: ApplicationCardProps) => {
  return (
    <div className={c.applicationCard}>
      <div className={c.headerWrapper}>
        <p>{team.name}</p>
        <div className={c.divider} />
        <MemberNumberIndicator value={team.members.length} min={3} max={5} />
      </div>
      <div className={c.members}>
        <div className={c.member}>
          <StarIcon className={clsx(c.icon, c.captainIcon)} />
          <div className={c.captainData}>
            <p>{team.captainName}</p>
            <p>{team.captainEmail}</p>
          </div>
        </div>
        {team.members.map((member) => (
          <div key={member} className={c.member}>
            <PersonIcon className={c.icon} />
            <p>{member}</p>
          </div>
        ))}
      </div>
      <button
        className={clsx(c.button, {
          [c.primary]: action === "complete",
          [c.secondary]: action === "edit" || action === "reapply",
        })}
      >
        {action === "complete"
          ? "Complete"
          : action === "edit"
          ? "Edit"
          : "Reapply"}
        {action === "complete" && <WarningIcon className={c.warningIcon} />}
      </button>
    </div>
  );
};

export default ApplicationCard;
