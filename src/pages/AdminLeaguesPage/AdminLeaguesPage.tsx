import { useNavigate } from "react-router-dom";
import AdminTable from "../../components/AdminTable";
import type { AdminTableColumn } from "../../components/AdminTable/types";
import c from "./AdminLeaguesPage.module.scss";
import { useMutation, useQuery } from "@tanstack/react-query";
import { db } from "../../database/db";
import type { League } from "../../database/services/leagueService";

const AdminLeaguesPage = () => {
  const navigate = useNavigate();

  const { data: leagues } = useQuery<League[]>({
    queryKey: ["leagues"],
    queryFn: db.leagues.getAll,
  });

  const { mutate: addLeague } = useMutation({
    mutationFn: db.leagues.add,
  });

  const { mutate: editLeague } = useMutation({
    mutationFn: db.leagues.update,
  });

  const { mutate: deleteLeague } = useMutation({
    mutationFn: db.leagues.delete,
  });

  const columns: AdminTableColumn<League>[] = [
    {
      id: "id",
      label: "ID",
      type: "string",
      width: 1,
      accessor: (item) => item.id,
      getSearchValue: (item) => item.id || "",
      notEditable: true,
      notAddable: true,
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
      <AdminTable
        columns={columns}
        data={leagues || []}
        title="Sve Lige"
        addFn={addLeague}
        editFn={editLeague}
        deleteFn={deleteLeague}
      />
    </div>
  );
};

export default AdminLeaguesPage;
