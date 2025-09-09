import AdminTable from "../../components/AdminTable";
import type { AdminTableColumn } from "../../components/AdminTable/types";
import { formatDate } from "../../helpers";
import type { Team } from "../../types";
import c from "./AdminQuizApplicationsPage.module.scss";

const data: Team[] = [
  {
    id: 1,
    name: "Ekipe 1",
    captainName: "Ivan Horvat",
    captainEmail: "ivan.horvat@example.com",
    members: ["Ana Kovač", "Marko Marić", "Luka Babić"],
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

const AdminQuizApplicationsPage = () => {
  const columns: AdminTableColumn<Team>[] = [
    {
      id: "id",
      label: "ID",
      render: (team) => team.id,
      getSearchValue: (team) => team.id.toString(),
      type: "number",
      width: 1,
      notEditable: true,
    },
    {
      id: "name",
      label: "Naziv ekipe",
      render: (team) => team.name,
      getSearchValue: (team) => team.name,
      type: "string",
      width: 150,
    },
    {
      id: "captainName",
      label: "Ime kapetana",
      render: (team) => team.captainName,
      getSearchValue: (team) => team.captainName,
      type: "string",
      width: 150,
    },
    {
      id: "captainEmail",
      label: "Email kapetana",
      render: (team) => team.captainEmail,
      getSearchValue: (team) => team.captainEmail,
      type: "string",
      width: 200,
    },
    {
      id: "members",
      label: "Članovi",
      render: (team) => team.members.join(", "),
      getSearchValue: (team) => team.members.join(", "),
      type: "string",
      width: 200,
    },
    {
      id: "membersCount",
      label: "Broj Članova",
      render: (team) => team.members.length,
      getSearchValue: (team) => team.members.length.toString(),
      type: "number",
      width: 1,
      labelHidden: true,
      inputHidden: true,
    },
    {
      id: "applicationDate",
      label: "Datum prijave",
      render: (team) => formatDate(team.applicationDate?.toISOString() || ""),
      getSearchValue: (team) =>
        formatDate(team.applicationDate?.toISOString() || ""),
      type: "timestamp",
    },
  ];
  return (
    <div className={c.page}>
      <AdminTable columns={columns} title="Prijave na kviz" data={data} />
    </div>
  );
};

export default AdminQuizApplicationsPage;
