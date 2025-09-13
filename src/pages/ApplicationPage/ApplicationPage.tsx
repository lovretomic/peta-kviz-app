import ApplicationCard from "../../components/ApplicationCard";
import type { Team } from "../../components/ApplicationCard/ApplicationCard";
import Button from "../../components/Button";
import PageWrapper from "../../components/PageWrapper";
import ProgressBar from "../../components/ProgressBar";
import AddIcon from "../../assets/icons/add.svg?react";

import c from "./ApplicationPage.module.scss";
import { useNavigate } from "react-router-dom";

const team: Team = {
  name: "Team A",
  captainName: "John Doe",
  captainEmail: "john.doe@example.com",
  members: ["Alice", "Bob"],
};

const ApplicationPage = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper className={c.page}>
      <ProgressBar percentage={50} label="Prijava ekipe" date={new Date()} />
      <ApplicationCard team={team} action="reapply" />
      <Button icon={<AddIcon />} onClick={() => navigate("/application/apply")}>
        Prijavi novu ekipu
      </Button>
    </PageWrapper>
  );
};

export default ApplicationPage;
