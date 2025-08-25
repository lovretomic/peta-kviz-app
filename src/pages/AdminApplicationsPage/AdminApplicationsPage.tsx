import { useMemo, useRef, useState } from "react";
import c from "./AdminApplicationsPage.module.scss";
import clsx from "clsx";
import AdminButton from "../../components/AdminButton";
import DownloadIcon from "../../assets/icons/download.svg?react";
import CloseIcon from "../../assets/icons/close.svg?react";
import KeyboardArrowDownIcon from "../../assets/icons/keyboard-arrow-down.svg?react";
import { teams } from "./teams";
import type { Team } from "../../types";

type ColumnDefinition = {
  key: string;
  header: string;
  accessor: (team: Team) => unknown;
  sortFn?: (a: Team, b: Team) => number;
  isSortable?: boolean;
};

const columns: ColumnDefinition[] = [
  {
    key: "id",
    header: "ID",
    accessor: (team: Team) => team.id,
    sortFn: (a: Team, b: Team) => a.id - b.id,
    isSortable: false,
  },
  {
    key: "name",
    header: "Naziv ekipe",
    accessor: (team: Team) => team.name,
    sortFn: (a: Team, b: Team) => a.name.localeCompare(b.name),
  },
  {
    key: "captainName",
    header: "Kapetan",
    accessor: (team: Team) => team.captainName,
    sortFn: (a: Team, b: Team) => a.captainName.localeCompare(b.captainName),
  },
  {
    key: "captainEmail",
    header: "Kontakt",
    accessor: (team: Team) => team.captainEmail,
    sortFn: (a: Team, b: Team) => a.captainEmail.localeCompare(b.captainEmail),
  },
  {
    key: "members",
    header: "Članovi",
    accessor: (team: Team) => team.members.length,
    sortFn: (a: Team, b: Team) => a.members.length - b.members.length,
  },
];

const AdminApplicationsPage = () => {
  const leftRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0.8 * window.innerWidth);

  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const [sortKey, setSortKey] = useState<string | null>(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newWidth = e.clientX - 8;

      if (newWidth > 100 && newWidth < window.innerWidth - 100) {
        setWidth(newWidth);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const sortedTeams = useMemo(() => {
    if (!sortKey) return teams;

    return [...teams].sort((a, b) => {
      const aValue = columns.find((col) => col.key === sortKey)?.sortFn?.(a, b);
      const bValue = columns.find((col) => col.key === sortKey)?.sortFn?.(b, a);
      return (aValue ?? 0) - (bValue ?? 0);
    });
  }, [sortKey]);

  return (
    <div
      className={c.adminApplicationsPage}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <main
        className={c.main}
        ref={leftRef}
        style={{ width: selectedTeam ? width : "100%", color: "black" }}
      >
        <header className={c.header}>
          <h2 className={c.title}>Prijave</h2>
          <AdminButton Icon={DownloadIcon}>Izvezi (.xlsx)</AdminButton>
        </header>
        <section className={c.tableSection}>
          <table className={c.table}>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={clsx({
                      [c.isSortable]: column.isSortable !== false,
                      [c.sorted]: sortKey === column.key,
                    })}
                    onClick={() => {
                      if (column.isSortable !== false) setSortKey(column.key);
                    }}
                  >
                    {column.header}
                    {sortKey === column.key && (
                      <KeyboardArrowDownIcon className={c.sortIcon} />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedTeams.map((team) => (
                <tr
                  className={clsx({
                    [c.selected]: selectedTeam?.id === team.id,
                  })}
                  key={team.id}
                  onClick={() => setSelectedTeam(team)}
                >
                  {columns.map((column) => (
                    <td key={column.key}>{String(column.accessor(team))}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
      {selectedTeam && (
        <>
          <div
            className={clsx(c.hSeparator, { [c.isDragging]: isDragging })}
            onMouseDown={handleMouseDown}
          >
            <div className={c.resizeHandle} />
          </div>
          <aside
            className={c.aside}
            style={{ width: `calc(100% - ${width}px)` }}
          >
            <CloseIcon
              className={c.closeButton}
              onClick={() => setSelectedTeam(null)}
            />

            <h3 className={c.teamName}>{selectedTeam.name}</h3>
            <div className={c.teamDetails}>
              <p className={c.label}>Kapetan</p>
              <p className={c.data}>{selectedTeam.captainName}</p>
              <p className={clsx(c.data, c.email)}>
                {selectedTeam.captainEmail}
              </p>

              <p className={c.label}>Članovi</p>
              <p className={c.data}>{selectedTeam.members.join(", ")}</p>
            </div>
          </aside>
        </>
      )}
    </div>
  );
};

export default AdminApplicationsPage;
