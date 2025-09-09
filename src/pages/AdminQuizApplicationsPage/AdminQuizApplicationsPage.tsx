import AdminTable from "../../components/AdminTable";
import type { AdminTableColumn } from "../../components/AdminTable/types";
import type { Team } from "../../types";
import c from "./AdminQuizApplicationsPage.module.scss";

const data: Team[] = [
  {
    id: 1,
    name: "Ekipe 1",
    captainName: "Ivan Horvat",
    captainEmail: "ivan.horvat@example.com",
    members: ["Ana Kovač", "Marko Marić", "Luka Babić"],
  },
  {
    id: 2,
    name: "Ekipe 2",
    captainName: "Petra Novak",
    captainEmail: "petra.novak@example.com",
    members: ["Luka Babić", "Ana Kovač", "Marko Marić"],
  },
  {
    id: 3,
    name: "Ekipe 3",
    captainName: "Marko Marić",
    captainEmail: "marko.maric@example.com",
    members: ["Ana Kovač", "Petra Novak", "Luka Babić"],
  },
];

const AdminQuizApplicationsPage = () => {
  const columns: AdminTableColumn<Team>[] = [
    {
      id: "id",
      label: "ID",
      render: (team) => team.id,
      type: "number",
    },
  ];
  return (
    <div className={c.page}>
      <AdminTable columns={columns} title="Prijave na kviz" data={data} />
    </div>
  );
};

export default AdminQuizApplicationsPage;
