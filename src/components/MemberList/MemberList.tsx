import c from "./MemberList.module.scss";
import PillButton from "../PillButton/PillButton";
import Button from "../Button/Button";
import Input from "../Input/Input";
import PlusIcon from "../../assets/icons/person-with-plus.svg";
import type React from "react";

type MemberListProps = {
  members: { name: string; isCaptain?: boolean }[];
};

const MemberList: React.FC<MemberListProps> = ({ members }) => {
  return (
    <div className={c.memberList}>
      Popis članova |
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
