import { useNavigate } from "react-router-dom";
import AdminTable from "../../components/AdminTable";
import type { AdminTableColumn } from "../../components/AdminTable/types";
import c from "./AdminLeaguesPage.module.scss";

type Quiz = {
  id: number;
  title: string;
};

type League = {
  id: number;
  name: string;
  quizzes?: Quiz[];
};

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
  const navigate = useNavigate();

  const columns: AdminTableColumn<League>[] = [
    {
      id: "id",
      label: "ID",
      type: "number",
      width: 1,
      accessor: (item) => item.id,
      getSearchValue: (item) => item.id.toString(),
      notEditable: true,
    },
    {
      id: "name",
      label: "Naziv",
      type: "string",
      accessor: (item) => item.name,
      getSearchValue: (item) => item.name,
      width: 200,
    },
    {
      id: "quizzes",
      label: "Kvizevi",
      type: "action",
      notSortable: true,
      width: 1,
      onAction: (item) => {
        navigate(`/admin/leagues/${item.id}/quizzes`);
      },
    },
  ];
  return (
    <div className={c.page}>
      <AdminTable columns={columns} data={leagues} title="Sve Lige" />
    </div>
  );
};

export default AdminLeaguesPage;
