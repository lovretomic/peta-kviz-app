import AdminTable from "../../components/AdminTable";
import type { AdminTableColumn } from "../../components/AdminTable/types";
import c from "./AdminLeaguesPage.module.scss";

type League = {
  id: number;
  name: string;
};

const columns: AdminTableColumn<League>[] = [
  {
    id: "id",
    label: "ID",
    type: "number",
    width: 1,
    render: (item) => item.id,
    getSearchValue: (item) => item.id.toString(),
  },
  {
    id: "name",
    label: "Naziv",
    type: "string",
    render: (item) => item.name,
    getSearchValue: (item) => item.name,
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
  { id: 10, name: "Brasileirão" },
  { id: 11, name: "J1 League" },
  { id: 12, name: "A-League" },
  { id: 13, name: "MLS Next Pro" },
  { id: 14, name: "USL Championship" },
];

const AdminLeaguesPage = () => {
  return (
    <div className={c.page}>
      <AdminTable columns={columns} data={leagues} title="Sve Lige" />
    </div>
  );
};

export default AdminLeaguesPage;
