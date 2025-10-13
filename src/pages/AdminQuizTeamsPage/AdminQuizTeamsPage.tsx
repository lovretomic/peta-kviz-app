import AdminTable from "../../components/AdminTable";
import type { AdminTableColumn } from "../../components/AdminTable/types";
import { formatDate } from "../../helpers";
import type { Team } from "../../types";
import c from "./AdminQuizTeamsPage.module.scss";

const data: Team[] = [
  {
    id: 1,
    name: "Ekipe 1",
    captainName: "Ivan Horvat",
    captainEmail: "ivan.horvat@example.com",
    members: ["Ana Kovač", "Marko Marić", "Luka Babić", "Petra Novak"],
    applicationDate: new Date("2024-06-15T10:30:00Z"),
  },
  {
    id: 2,
    name: "Ekipe 2",
    captainName: "Petra Novak",
    captainEmail: "petra.novak@example.com",
    members: ["Luka Babić", "Ana Kovač", "Marko Marić"],
    applicationDate: new Date("2024-06-16T14:45:00Z"),
  },
  {
    id: 3,
    name: "Ekipe 3",
    captainName: "Marko Marić",
    captainEmail: "marko.maric@example.com",
    members: ["Ana Kovač", "Petra Novak", "Luka Babić"],
    applicationDate: new Date("2024-06-17T09:15:00Z"),
  },
];

const AdminQuizTeamsPage = () => {
  const columns: AdminTableColumn<Team>[] = [
    {
      id: "id",
      label: "ID",
      type: "number",
      accessor: (team) => team.id,
      getSearchValue: (team) => team.id.toString(),
      width: 1,
      notEditable: true,
    },
    {
      id: "name",
      label: "Naziv ekipe",
      type: "string",
      accessor: (team) => team.name,
      getSearchValue: (team) => team.name,
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
      getSearchValue: (team) =>
        formatDate(team.applicationDate?.toISOString() || ""),
    },
  ];
  return (
    <div className={c.page}>
      <AdminTable columns={columns} title="Prijave na kviz" data={data} />
    </div>
  );
};

export default AdminQuizTeamsPage;
