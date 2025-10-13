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
    queryKey: ["quizzes", leagueId],
    queryFn: () => db.quizzes.getAll(leagueId as string),
  });

  const { mutate: addQuiz } = useMutation({
    mutationFn: (quiz: Omit<Quiz, "id">) =>
      db.quizzes.add(quiz, leagueId as string),
  });

  const { mutate: editQuiz } = useMutation({
    mutationFn: (quiz: Partial<Quiz>) =>
      db.quizzes.update(quiz, leagueId as string),
  });

  const { mutate: deleteQuiz } = useMutation({
    mutationFn: (id: string) => db.quizzes.delete(id, leagueId as string),
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
      notAddable: true,
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
      type: "timestamp",
      accessor: (quiz) => quiz.time,
      getSearchValue: (quiz) => formatDate(quiz.time as Date),
      width: 250,
    },
    {
      id: "updatedAt",
      label: "Ažurirano",
      type: "timestamp",
      accessor: (quiz) => quiz.updatedAt,
      getSearchValue: (quiz) => formatDate(quiz.updatedAt as Date),
      notAddable: true,
      notEditable: true,
      width: 200,
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
        addFn={addQuiz}
        editFn={editQuiz}
        deleteFn={deleteQuiz}
      />
    </div>
  );
};

export default AdminLeagueQuizzesPage;
