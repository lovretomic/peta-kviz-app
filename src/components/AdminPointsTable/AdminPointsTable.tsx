import { useState } from "react";
import c from "./AdminPointsTable.module.scss";
import AdminButton from "../AdminButton";
import clsx from "clsx";

export type TeamPointsRow = {
  id: string;
  name: string;
  points: number;
};

const data: TeamPointsRow[] = [
  { id: "1", name: "Team A", points: 100 },
  { id: "2", name: "Team B", points: 200 },
  { id: "3", name: "Team C", points: 300 },
];

const AdminPointsTable = () => {
  const [rows, setRows] = useState<TeamPointsRow[]>(data);
  const [displayedRows, setDisplayedRows] = useState<TeamPointsRow[]>(data);

  const [rounds, setRounds] = useState(2);

  return (
    <div className={c.adminPointsTable}>
      <div className={c.buttons}>
        <AdminButton onClick={() => setRows(displayedRows)}>Spremi</AdminButton>
        <AdminButton variant="secondary">Preuzmi tablicu</AdminButton>
        <AdminButton variant="secondary">Učitaj podatke</AdminButton>
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
