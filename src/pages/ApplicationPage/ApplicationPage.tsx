import ApplicationCard from "../../components/ApplicationCard";
import type { Team } from "../../components/ApplicationCard/ApplicationCard";
import Button from "../../components/Button";
import PageWrapper from "../../components/PageWrapper";
import ProgressBar from "../../components/ProgressBar";
import AddIcon from "../../assets/icons/add.svg?react";

import HourglassEmptyIcon from "../../assets/icons/hourglass-empty.svg?react";

import c from "./ApplicationPage.module.scss";
import { useNavigate } from "react-router-dom";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import clsx from "clsx";

const team: Team = {
  name: "Team A",
  captainName: "John Doe",
  captainEmail: "john.doe@example.com",
  members: ["Alice", "Bob"],
};

type WaitingTime = "long" | "short" | "none";

const ApplicationPage = () => {
  const navigate = useNavigate();
  const waitingTime: WaitingTime = "long";
  const isDesktop = useIsDesktop();

  if (waitingTime === "long")
    return (
      <PageWrapper className={clsx(c.message, isDesktop && c.isDesktop)}>
        <HourglassEmptyIcon className={c.icon} />
        <h2 className={c.title}>Ima još vremena</h2>
        <p className={c.text}>
          Kvizevi se održavaju svakog posljednjeg petka u mjesecu. Prijave se
          otvaraju nekoliko dana prije kviza.
        </p>
      </PageWrapper>
    );

  if (waitingTime === "short")
    return (
      <PageWrapper
        className={clsx(c.message, isDesktop && c.isDesktop, c.shortWait)}
      >
        <HourglassEmptyIcon className={c.icon} />
        <h2 className={c.title}>Prijave se uskoro otvaraju</h2>
        <p className={c.text}>
          Prijave za sljedeći kviz još nisu otvorene. Pratite naš Instagram
          profil za obavijesti.
        </p>
      </PageWrapper>
    );

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
