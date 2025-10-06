import AdminTable from "../../components/AdminTable";
import type { AdminTableColumn } from "../../components/AdminTable/types";

type PointRow = {
  quizId: string;
  quizTitle: string;
  points: number;
};

const AdminPointsPage = () => {
  const columns: AdminTableColumn<PointRow>[] = [
    {
      id: "quizId",
      type: "string",
      label: "Quiz ID",
      render: (row: PointRow) => row.quizId,
      width: 1,
    },
    {
      id: "quizTitle",
      type: "string",
      label: "Quiz Title",
      render: (row: PointRow) => row.quizTitle,
      width: 1,
    },
    {
      id: "points",
      type: "number",
      label: "Points",
      render: (row: PointRow) => row.points,
      width: 1,
    },
  ];

  const data = [
    { quizId: "1", quizTitle: "Quiz 1", points: 10 },
    { quizId: "2", quizTitle: "Quiz 2", points: 20 },
    { quizId: "3", quizTitle: "Quiz 3", points: 15 },
  ];

  return (
    <>
      <AdminTable columns={columns} data={data} title="Admin Points" />
    </>
  );
};

export default AdminPointsPage;
