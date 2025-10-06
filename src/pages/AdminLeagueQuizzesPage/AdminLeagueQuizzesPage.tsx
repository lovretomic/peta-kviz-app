import { useNavigate, useParams } from "react-router-dom";
import AdminTable from "../../components/AdminTable";
import type { AdminTableColumn } from "../../components/AdminTable/types";

import c from "./AdminLeagueQuizzesPage.module.scss";
import { formatDate } from "../../helpers";

import { useMutation, useQuery } from "@tanstack/react-query";
import { db } from "../../database/db";
import type { Quiz } from "../../database/services/quizService";

const AdminLeagueQuizzesPage = () => {
  const { leagueId } = useParams();
  const navigate = useNavigate();

  const { data: quizzes } = useQuery<Quiz[]>({
    queryKey: ["quizzes"],
    queryFn: db.quizzes.getAll,
  });

  const { mutate: addQuiz } = useMutation({
    mutationFn: db.quizzes.add,
  });

  const { mutate: editQuiz } = useMutation({
    mutationFn: db.quizzes.add,
  });

  const { mutate: deleteQuiz } = useMutation({
    mutationFn: db.quizzes.delete,
  });

  const columns: AdminTableColumn<Quiz>[] = [
    {
      id: "id",
      label: "ID",
      accessor: (quiz) => quiz.id,
      getSearchValue: (quiz) => quiz.id?.toString() ?? "",
      type: "string",
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
      id: "time",
      label: "Vrijeme",
      accessor: (quiz) => new Date(quiz.time as Date),
      type: "timestamp",
      width: 250,
      getSearchValue: (quiz) => formatDate(quiz.time as Date),
    },
    {
      id: "updatedAt",
      label: "Ažurirano",
      accessor: (quiz) => new Date(quiz.updatedAt as Date),
      type: "timestamp",
      width: 250,
      getSearchValue: (quiz) => formatDate(quiz.updatedAt as Date),
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

  return (
    <div className={c.page}>
      <AdminTable
        title={`Kvizovi - Liga ${leagueId}`}
        columns={columns}
        data={quizzes || []}
      />
    </div>
  );
};

export default AdminLeagueQuizzesPage;
