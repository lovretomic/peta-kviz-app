import { useState } from "react";
import c from "./AdminPointsTable.module.scss";
import AdminButton from "../AdminButton";
import clsx from "clsx";

export type TeamPointsRow = {
  id: string;
  name: string;
  rounds: {
    order: number;
    points: number;
  }[];
};

const data: TeamPointsRow[] = [
  {
    id: "1",
    name: "Team A",
    rounds: [
      {
        order: 1,
        points: 52,
      },
    ],
  },
  {
    id: "2",
    name: "Team B",
    rounds: [
      {
        order: 1,
        points: 53,
      },
    ],
  },
];

const AdminPointsTable = () => {
  const [rows, setRows] = useState<TeamPointsRow[]>(data);
  const [displayedRows, setDisplayedRows] = useState<TeamPointsRow[]>(data);

  return (
    <div className={c.adminPointsTable}>
      <div className={c.buttons}>
        <AdminButton onClick={() => setRows(displayedRows)}>Spremi</AdminButton>
        <AdminButton variant="secondary">Preuzmi tablicu</AdminButton>
        <AdminButton variant="secondary">Učitaj podatke</AdminButton>
      </div>
      <div className={c.container}>
        {displayedRows.map((displayedRow) => (
          <>
            <div>{displayedRow.name}</div>
            {displayedRow.rounds.map((round, i) => (
              <input
                type="number"
                value={round.points.toString()}
                onChange={(e) => {
                  let val = e.target.value;
                  val = val.replace(/^0+(?=\d)/, "");
                  const newPoints = Number(val);

                  setDisplayedRows((prevRows) =>
                    prevRows.map((row) =>
                      row.id === displayedRow.id
                        ? ({
                            ...row,
                            rounds: row.rounds.map((r) =>
                              r.order === round.order
                                ? { ...round, points: newPoints }
                                : round
                            ),
                          } as TeamPointsRow)
                        : row
                    )
                  );
                }}
                className={clsx({
                  [c.input]: true,
                  [c.isChanged]:
                    rows.find((r) => r.id === displayedRow.id)?.rounds.at(i) !==
                    displayedRow.rounds.at(i),
                })}
              />
            ))}
          </>
        ))}
      </div>
    </div>
  );
};

export default AdminPointsTable;
