import MemberNumberIndicator from "../MemberNumberIndicator";
import c from "./ApplicationCard.module.scss";

import StarIcon from "../../assets/icons/star.svg?react";
import PersonIcon from "../../assets/icons/person.svg?react";
import clsx from "clsx";

import WarningIcon from "../../assets/icons/warning.svg?react";
import EditIcon from "../../assets/icons/edit.svg?react";
import RestartIcon from "../../assets/icons/restart.svg?react";
import TrashIcon from "../../assets/icons/trash.svg?react";

import Button from "../Button";

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

type Action = {
  label: string;
  icon: React.ReactElement;
};

const actions: Record<ApplicationCardProps["action"], Action> = {
  complete: {
    label: "Dovrši prijavu",
    icon: <WarningIcon />,
  },
  edit: {
    label: "Izmijeni prijavu",
    icon: <EditIcon />,
  },
  reapply: {
    label: "Ponovno prijavi",
    icon: <RestartIcon />,
  },
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
      <div className={c.buttons}>
        <Button
          icon={actions[action].icon}
          variant={action === "complete" ? "primary" : "outlined"}
        >
          {actions[action].label}
        </Button>

        {action !== "reapply" && (
          <Button icon={<TrashIcon />} variant="outlined" />
        )}
      </div>
    </div>
  );
};

export default ApplicationCard;
