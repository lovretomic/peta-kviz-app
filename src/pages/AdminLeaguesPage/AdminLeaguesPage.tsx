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
  { id: 4, name: "Serie A" },
  { id: 5, name: "Ligue 1" },
  { id: 6, name: "Eredivisie" },
  { id: 7, name: "Primeira Liga" },
  { id: 8, name: "Scottish Premiership" },
  { id: 9, name: "MLS" },
];

const AdminLeaguesPage = () => {
  return (
    <div className={c.page}>
      <AdminTable columns={columns} data={leagues} />
    </div>
  );
};

export default AdminLeaguesPage;
