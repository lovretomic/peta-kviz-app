import AdminPointsTable from "../../components/AdminPointsTable";
import type { TeamPointsRow } from "../../components/AdminPointsTable/AdminPointsTable";
import c from "./AdminPointsPage.module.scss";

const data: TeamPointsRow[] = [
  { id: "1", name: "Team A", points: 100 },
  { id: "2", name: "Team B", points: 200 },
  { id: "3", name: "Team Cwieufhiewuf", points: 300 },
];

const AdminPointsPage = () => {
  return (
    <div className={c.page}>
      <AdminPointsTable data={data} />
    </div>
  );
};

export default AdminPointsPage;
