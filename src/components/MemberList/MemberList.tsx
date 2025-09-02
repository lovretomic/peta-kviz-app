import c from "./MemberList.module.scss";
import PillButton from "./PillButton/PillButton";
import Button from "../Button/Button";
import Input from "../Input/Input";
import PlusIcon from "../../assets/icons/person-with-plus.svg";
import type React from "react";
import FullIndicator from "../FullIndicator";

type MemberListProps = {
  members: { name: string; isCaptain?: boolean }[];
  maxMembers?: number;
};

const MemberList: React.FC<MemberListProps> = ({ members }) => {
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
        <Input placeholder="Upiši ime i prezime člana" />
        <Button variant="primary" icon={PlusIcon} />
      </div>
      {members.map((member) => (
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
