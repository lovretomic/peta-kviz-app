import { useNavigate, useParams } from "react-router-dom";
import AdminTable from "../../components/AdminTable";
import type { AdminTableColumn } from "../../components/AdminTable/types";

import c from "./AdminLeagueQuizzesPage.module.scss";
import { formatDate } from "../../helpers";

type Quiz = {
  id: number;
  title: string;
  timestamp: string;
};

const AdminLeagueQuizzesPage = () => {
  const { leagueId } = useParams();
  const navigate = useNavigate();

  const columns: AdminTableColumn<Quiz>[] = [
    {
      id: "id",
      label: "ID",
      accessor: (quiz) => quiz.id,
      getSearchValue: (quiz) => quiz.id.toString(),
      type: "number",
      width: 1,
      notEditable: true,
    },
    {
      id: "title",
      label: "Naslov",
      accessor: (quiz) => quiz.title,
      getSearchValue: (quiz) => quiz.title,
      type: "string",
      width: 200,
    },
    {
      id: "timestamp",
      label: "Vrijeme",
      accessor: (quiz) => new Date(quiz.timestamp),
      type: "timestamp",
      width: 250,
      getSearchValue: (quiz) => formatDate(quiz.timestamp),
    },
    {
      id: "teams",
      label: "Prijave",
      labelHidden: true,
      type: "action",
      notSortable: true,
      onAction: (item) => {
        navigate(`/admin/leagues/${leagueId}/quizzes/${item.id}`);
      },
    },
  ];

  const data: Quiz[] = [
    { id: 1, title: "Kviz 1", timestamp: "2023-10-01 10:00" },
    { id: 2, title: "Kviz 2", timestamp: "2023-10-02 11:00" },
  ];

  return (
    <div className={c.page}>
      <AdminTable
        title={`Kvizovi - Liga ${leagueId}`}
        columns={columns}
        data={data}
      />
    </div>
  );
};

export default AdminLeagueQuizzesPage;
