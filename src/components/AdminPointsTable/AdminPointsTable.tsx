import { useState } from "react";
import c from "./AdminPointsTable.module.scss";
import AdminButton from "../AdminButton";
import clsx from "clsx";
import Button from "../Button";
import type { TeamWithRounds } from "../../database/services/teamServices";

const data: TeamWithRounds[] = [
  {
    id: "id1",
    teamName: "Team A",
    rounds: [
      { order: 1, points: 10 },
      { order: 2, points: 15 },
    ],
  },
  {
    id: "1",
    teamName: "Team B",
    rounds: [
      { order: 1, points: 10 },
      { order: 3, points: 10 },
      { order: 2, points: 15 },
    ],
  },
];

const AdminPointsTable = () => {
  const [rows, setRows] = useState<TeamWithRounds[]>(data);
  const [displayedRows, setDisplayedRows] = useState<TeamWithRounds[]>(data);

  const maxRoundOrder = Math.max(
    ...data.flatMap((team) => team.rounds.map((round) => round.order))
  );

  const [additionalRounds, setAdditionalRounds] = useState(0);
  const totalRounds = maxRoundOrder + additionalRounds;

  return (
    <div className={c.adminPointsTable}>
      <div className={c.buttons}>
        <AdminButton onClick={() => setRows(displayedRows)}>Spremi</AdminButton>
        <AdminButton variant="secondary">Preuzmi tablicu</AdminButton>
        <AdminButton variant="secondary">Učitaj podatke</AdminButton>
      </div>
      <div className={c.tableButtonWrapper}>
        <table className={c.table}>
          <thead>
            <tr>
              <th className={c.cell}>Tim</th>
              {Array.from({ length: totalRounds }).map((_, index) => (
                <th key={index} className={c.cell}>
                  Runda {index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayedRows.map((row) => (
              <tr key={row.id}>
                <td className={clsx(c.cell, c.teamName)}>{row.teamName}</td>
                {Array.from({ length: totalRounds }).map((_, index) => {
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
        <Button
          variant="primary"
          onClick={() => setAdditionalRounds((prev) => prev + 1)}
        >
          Dodaj rundu
        </Button>
      </div>
    </div>
  );
};

export default AdminPointsTable;
