import { useRef, useState } from "react";
import c from "./AdminApplicationsPage.module.scss";
import clsx from "clsx";
import AdminButton from "../../components/AdminButton";
import DownloadIcon from "../../assets/icons/download.svg?react";
import CloseIcon from "../../assets/icons/close.svg?react";
import { teams } from "./teams";
import type { Team } from "../../types";

const AdminApplicationsPage = () => {
  const leftRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0.8 * window.innerWidth);

  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

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
                <th>ID</th>
                <th>Naziv ekipe</th>
                <th>Kapetan</th>
                <th>Kontakt</th>
                <th>Članovi</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr
                  className={clsx({
                    [c.selected]: selectedTeam?.id === team.id,
                  })}
                  key={team.id}
                  onClick={() => setSelectedTeam(team)}
                >
                  <td>{team.id}</td>
                  <td>{team.name}</td>
                  <td>{team.captainName}</td>
                  <td>{team.captainEmail}</td>
                  <td>{team.members.join(", ")}</td>
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
