import AdminTable from "../../components/AdminTable";
import type { AdminTableColumn } from "../../components/AdminTable/types";
import { formatDate } from "../../helpers";
import c from "./AdminQuizTeamsPage.module.scss";

import { useMutation, useQuery } from "@tanstack/react-query";
import { db } from "../../database/db";
import type { Team } from "../../database/services/teamServices";
import { useParams } from "react-router-dom";

const AdminQuizTeamsPage = () => {
  const { leagueId, quizId } = useParams();

  const { data: teams } = useQuery<Team[]>({
    queryKey: ["teams", quizId, leagueId],
    queryFn: () => db.teams.getAll(quizId as string, leagueId as string),
  });

  const { mutate: addTeam } = useMutation({
    mutationFn: (team: Omit<Team, "id">) =>
      db.teams.add(team, quizId as string, leagueId as string),
  });

  const { mutate: editTeam } = useMutation({
    mutationFn: (team: Partial<Team>) =>
      db.teams.update(team, quizId as string, leagueId as string),
  });

  const { mutate: deleteTeam } = useMutation({
    mutationFn: (id: string) =>
      db.teams.delete(id, quizId as string, leagueId as string),
  });

  const columns: AdminTableColumn<Team>[] = [
    {
      id: "id",
      label: "ID",
      type: "number",
      accessor: (team) => team.id,
      getSearchValue: (team) => team.id?.toString() ?? "",
      width: 1,
      notEditable: true,
    },
    {
      id: "name",
      label: "Naziv ekipe",
      type: "string",
      accessor: (team) => team.teamName,
      getSearchValue: (team) => team.teamName,
      width: 150,
    },
    {
      id: "captainName",
      label: "Ime kapetana",
      type: "string",
      accessor: (team) => team.captainName,
      getSearchValue: (team) => team.captainName,
      width: 150,
    },
    {
      id: "captainEmail",
      label: "Email kapetana",
      type: "string",
      accessor: (team) => team.captainEmail,
      getSearchValue: (team) => team.captainEmail,
      width: 200,
      hiddenByDefault: true,
    },
    {
      id: "members",
      label: "Članovi",
      type: "stringArray",
      accessor: (team) => team.members,
      getSearchValue: (team) => team.members.join(", "),
      width: 200,
    },
    {
      id: "applicationDate",
      label: "Datum prijave",
      type: "timestamp",
      accessor: (team) => team.applicationDate,
      getSearchValue: (team) => formatDate(team.applicationDate as Date) || "",
    },
  ];
  return (
    <div className={c.page}>
      <AdminTable
        columns={columns}
        title={`Timovi - Kviz ${quizId}`}
        data={teams || []}
        addFn={addTeam}
        editFn={editTeam}
        deleteFn={deleteTeam}
      />
    </div>
  );
};

export default AdminQuizTeamsPage;
