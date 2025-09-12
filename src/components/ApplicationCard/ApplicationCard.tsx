import MemberNumberIndicator from "../MemberNumberIndicator";
import c from "./ApplicationCard.module.scss";

import StarIcon from "../../assets/icons/star.svg?react";
import PersonIcon from "../../assets/icons/person.svg?react";

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
          <StarIcon className={c.icon} />
          <p>{team.captainName}</p>
        </div>
        {team.members.map((member) => (
          <div key={member} className={c.member}>
            <PersonIcon className={c.icon} />
            <p>{member}</p>
          </div>
        ))}
      </div>
      <button>
        {action === "complete"
          ? "Complete"
          : action === "edit"
          ? "Edit"
          : "Reapply"}
      </button>
    </div>
  );
};

export default ApplicationCard;
