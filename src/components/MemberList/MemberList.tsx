import c from "./MemberList.module.scss";
import PillButton from "./PillButton/PillButton";
import Button from "../Button/Button";
import Input from "../Input/Input";
import PlusIcon from "../../assets/icons/person-with-plus.svg";
import type React from "react";
import FullIndicator from "../FullIndicator";

type MemberListProps = {
  members: { name: string; isCaptain?: boolean }[];
  //addMember?: (name: string) => void;
  maxMembers?: number;
};

const MemberList: React.FC<MemberListProps> = ({
  members,
  maxMembers = 5,
  //addMember, // eslint zeza
}) => {
  return (
    <div className={c.memberList}>
      <div className={c.header}>
        <span>Popis članova</span>
        <div className={c.divider} />
        <FullIndicator
          numberOfIndicators={5}
          filledIndicators={members.length}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "8px",
          marginTop: "8px",
        }}
      >
        <Input
          placeholder={
            members.length == maxMembers
              ? "Upisan maksimalan broj članova"
              : "Upiši ime i prezime člana"
          }
        />
        <Button
          variant="primary"
          icon={PlusIcon}
          disabled={members.length === maxMembers}
          onClick={() =>
            //addMember
            {}
          }
        />
      </div>
      {[
        ...members.filter((m) => m.isCaptain),
        ...members.filter((m) => !m.isCaptain),
      ]
        .sort((a, b) => (b.isCaptain ? 1 : 0) - (a.isCaptain ? 1 : 0))
        .map((member) => (
          <PillButton
            key={member.name}
            variant={member.isCaptain ? "captain" : "primary"}
          >
            {member.name}
          </PillButton>
        ))}
    </div>
  );
};

export default MemberList;
