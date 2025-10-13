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
    <div className={c.page}>
      <h1 className={c.title}>Kviz općeg znanja — bodovi</h1>
      <p className={c.subtitle}>1. 1. 2025. u 19:00 sati.</p>
      <div className={c.container}>
        {rows.map((row) => (
          <>
            <div>{row.name}</div>
            <input
              type="number"
              value={row.points.toString()}
              onChange={(e) => {
                let val = e.target.value;

                val = val.replace(/^0+(?=\d)/, "");

                const newPoints = Number(val);

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
    </div>
  );
};

export default AdminPointsTable;
