import c from "./MemberList.module.scss";
import PillButton from "./PillButton/PillButton";
import Button from "../Button/Button";
import Input from "../Input/Input";
import PlusIcon from "../../assets/icons/person-with-plus.svg";
import type React from "react";
import MemberNumberIndicator from "../MemberNumberIndicator";
import { useState } from "react";

type MemberListProps = {
  formData: {
    teamName: string;
    captainName: string;
    captainEmail: string;
    members: string[];
  };
  addMember?: (name: string) => void;
  removeMember?: (name: string) => void;
  maxMembers?: number;
};

const MemberList: React.FC<MemberListProps> = ({
  formData,
  maxMembers = 5,
  addMember,
  removeMember,
}) => {
  const [newMember, setNewMember] = useState("");
  if (!formData) {
    return null;
  }
  return (
    <div className={c.memberList}>
      <div className={c.header}>
        <span>Popis članova</span>
        <div className={c.divider} />
        <MemberNumberIndicator
          numberOfIndicators={5}
          filledIndicators={formData.members.length + 1}
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
            formData.members.length + 1 == maxMembers
              ? "Upisan maksimalan broj članova"
              : "Upiši ime i prezime člana"
          }
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          disabled={formData.members.length + 1 === maxMembers}
        />
        <Button
          variant="primary"
          icon={PlusIcon}
          disabled={formData.members.length + 1 === maxMembers}
          onClick={() => {
            if (addMember) {
              addMember(newMember);
              setNewMember("");
            }
          }}
        />
      </div>

      {formData.captainName && (
        <PillButton variant="captain">{formData.captainName}</PillButton>
      )}

      {formData.members.map((m) => (
        <PillButton key={m} removeMember={removeMember}>
          {m}
        </PillButton>
      ))}
    </div>
  );
};

export default MemberList;
