import { useState } from "react";
import c from "./AdminPointsTable.module.scss";
import AdminButton from "../AdminButton";
import clsx from "clsx";

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
  const [displayedRows, setDisplayedRows] = useState<TeamPointsRow[]>(data);

  return (
    <div className={c.page}>
      <h1 className={c.title}>Kviz općeg znanja — bodovi</h1>
      <p className={c.subtitle}>1. 1. 2025. u 19:00 sati.</p>
      <div className={c.buttons}>
        <AdminButton onClick={() => setRows(displayedRows)}>Spremi</AdminButton>
      </div>
      <div className={c.container}>
        {displayedRows.map((row) => (
          <>
            <div>{row.name}</div>
            <input
              type="number"
              value={row.points.toString()}
              onChange={(e) => {
                let val = e.target.value;

                val = val.replace(/^0+(?=\d)/, "");

                const newPoints = Number(val);

                setDisplayedRows((prev) =>
                  prev.map((r) =>
                    r.id === row.id ? { ...r, points: newPoints } : r
                  )
                );
              }}
              className={clsx({
                [c.input]: true,
                [c.isChanged]:
                  rows.find((r) => r.id === row.id)?.points !== row.points,
              })}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default AdminPointsTable;
