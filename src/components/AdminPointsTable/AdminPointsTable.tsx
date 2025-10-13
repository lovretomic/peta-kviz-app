import { useState } from "react";
import c from "./AdminPointsTable.module.scss";

export type TeamPointsRow = {
  id: string;
  name: string;
  points: number;
};

type AdminPointsTableProps = {
  data: TeamPointsRow[];
};

const AdminPointsTable = ({ data }: AdminPointsTableProps) => {
  const [rows, setRows] = useState<TeamPointsRow[]>(data);

  return (
    <div className={c.container}>
      {rows.map((row) => (
        <>
          <div>{row.name}</div>
          <input
            type="number"
            value={row.points}
            onChange={(e) => {
              const newPoints = Number(e.target.value);
              setRows((prev) =>
                prev.map((r) =>
                  r.id === row.id ? { ...r, points: newPoints } : r
                )
              );
            }}
          />
        </>
      ))}
    </div>
  );
};

export default AdminPointsTable;
