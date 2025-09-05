import c from "./MemberList.module.scss";
import PillButton from "./PillButton/PillButton";
import Button from "../Button/Button";
import Input from "../Input/Input";
import PlusIcon from "../../assets/icons/person-with-plus.svg";
import type React from "react";
import MemberNumberIndicator from "../MemberNumberIndicator";
import { useState } from "react";

type MemberListProps = {
  captainName: string;
  members: string[];
  addMember?: (name: string) => void;
  removeMember?: (name: string) => void;
  maxMembers?: number;
};

const MemberList: React.FC<MemberListProps> = ({
  captainName,
  members,
  maxMembers = 5,
  addMember,
  removeMember,
}) => {
  const [newMember, setNewMember] = useState("");
  const hasMaxMembers = members.length + 1 >= maxMembers;
  return (
    <div className={c.memberList}>
      <div className={c.header}>
        <span>Popis članova</span>
        <div className={c.divider} />
        <MemberNumberIndicator max={5} value={members.length + 1} />
      </div>
      <div className={c.inputGroup}>
        <Input
          placeholder={
            hasMaxMembers
              ? "Upisan maksimalan broj članova"
              : "Upiši ime i prezime člana"
          }
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          disabled={hasMaxMembers}
        />
        <Button
          variant="primary"
          icon={PlusIcon}
          disabled={hasMaxMembers || newMember.trim() === ""}
          onClick={() => {
            if (addMember) {
              addMember(newMember);
              setNewMember("");
            }
          }}
        />
      </div>

      {captainName && <PillButton variant="captain">{captainName}</PillButton>}

      {members.map((member) => (
        <PillButton key={member} removeMember={removeMember}>
          {member}
        </PillButton>
      ))}
    </div>
  );
};

export default MemberList;
