import { useState } from "react";
import MemberList from "../../components/MemberList";

const TestPage = () => {
  const [formData, setFormData] = useState({
    teamName: "Moja ekipa",
    captainName: "Mak Terbovc",
    captainEmail: "example@example.com",
    members: ["Sahu mra", "Lovre Thomic"],
  });

  function addMember(name: string) {
    setFormData((prevData) => ({
      ...prevData,
      members: [...prevData.members, name],
    }));
  }

  function removeMember(name: string) {
    setFormData((prevData) => ({
      ...prevData,
      members: prevData.members.filter((member) => member !== name),
    }));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <MemberList
        formData={formData}
        addMember={addMember}
        removeMember={removeMember}
      />
    </div>
  );
};

export default TestPage;
