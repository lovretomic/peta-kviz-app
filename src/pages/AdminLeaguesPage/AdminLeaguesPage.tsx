import AdminTable from "../../components/AdminTable";
import type { AdminTableColumn } from "../../components/AdminTable/AdminTable";
import c from "./AdminLeaguesPage.module.scss";

type League = {
  id: number;
  name: string;
};

const columns: AdminTableColumn<League>[] = [
  {
    id: "id",
    label: "ID",
    type: "string",
    render: (item) => item.id,
  },
  {
    id: "name",
    label: "Naziv",
    type: "string",
    render: (item) => item.name,
  },
];

const leagues: League[] = [
  { id: 1, name: "Premier League" },
  { id: 2, name: "La Liga" },
  { id: 3, name: "Bundesliga" },
];

const AdminLeaguesPage = () => {
  return (
    <div className={c.page}>
      <AdminTable columns={columns} data={leagues} />
    </div>
  );
};

export default AdminLeaguesPage;
