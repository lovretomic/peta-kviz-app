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
      {
        order: 3,
        points: 48,
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
      {
        order: 2,
        points: 53,
      },
    ],
  },
];

const AdminPointsTable = () => {
  const [rows, setRows] = useState<TeamPointsRow[]>(data);
  const [displayedRows, setDisplayedRows] = useState<TeamPointsRow[]>(data);

  const maxRoundOrder = Math.max(
    ...data.flatMap((team) => team.rounds.map((round) => round.order))
  );

  return (
    <div className={c.adminPointsTable}>
      <div className={c.buttons}>
        <AdminButton onClick={() => setRows(displayedRows)}>Spremi</AdminButton>
        <AdminButton variant="secondary">Preuzmi tablicu</AdminButton>
        <AdminButton variant="secondary">Učitaj podatke</AdminButton>
      </div>
      <table className={c.table}>
        <thead>
          <tr>
            <th className={c.cell}>Tim</th>
            {Array.from({ length: maxRoundOrder }).map((_, index) => (
              <th key={index} className={c.cell}>
                Runda {index + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayedRows.map((row) => (
            <tr key={row.id}>
              <td className={clsx(c.cell, c.teamName)}>{row.name}</td>
              {Array.from({ length: maxRoundOrder }).map((_, index) => {
                const round = row.rounds.find((r) => r.order === index + 1);
                return (
                  <td key={index} className={c.cell}>
                    <input
                      type="number"
                      className={clsx(c.input, {
                        [c.isChanged]: round
                          ? round.points !==
                            rows
                              .find((r) => r.id === row.id)
                              ?.rounds.find((rd) => rd.order === index + 1)
                              ?.points
                          : rows
                              .find((r) => r.id === row.id)
                              ?.rounds.find((rd) => rd.order === index + 1)
                          ? true
                          : false,
                      })}
                      value={round ? round.points : ""}
                      onChange={(e) => {
                        const points = parseInt(e.target.value, 10);
                        setDisplayedRows((prevRows) =>
                          prevRows.map((r) => {
                            if (r.id === row.id) {
                              const existingRound = r.rounds.find(
                                (rd) => rd.order === index + 1
                              );
                              let newRounds;
                              if (existingRound) {
                                newRounds = r.rounds.map((rd) =>
                                  rd.order === index + 1
                                    ? { ...rd, points }
                                    : rd
                                );
                              } else {
                                newRounds = [
                                  ...r.rounds,
                                  { order: index + 1, points },
                                ];
                              }
                              return { ...r, rounds: newRounds };
                            }
                            return r;
                          })
                        );
                      }}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPointsTable;
