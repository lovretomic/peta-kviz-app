import ApplicationCard from "../../components/ApplicationCard";
import type { Team } from "../../components/ApplicationCard/ApplicationCard";
import PageWrapper from "../../components/PageWrapper";
import ProgressBar from "../../components/ProgressBar";

import c from "./ApplicationPage.module.scss";

const team: Team = {
  name: "Team A",
  captainName: "John Doe",
  captainEmail: "john.doe@example.com",
  members: ["Alice", "Bob", "Charlie"],
};

const ApplicationPage = () => {
  return (
    <PageWrapper className={c.page}>
      <ProgressBar percentage={50} label="Prijava ekipe" date={new Date()} />
      <ApplicationCard team={team} action="edit" />
    </PageWrapper>
  );
};

export default ApplicationPage;
