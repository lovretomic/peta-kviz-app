import { useRef, useState } from "react";
import c from "./AdminApplicationsPage.module.scss";
import clsx from "clsx";
import AdminButton from "../../components/AdminButton";
import DownloadIcon from "../../assets/icons/download.svg?react";
import { teams } from "./teams";

const AdminApplicationsPage = () => {
  const leftRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0.8 * window.innerWidth);

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
      <main className={c.main} ref={leftRef} style={{ width, color: "black" }}>
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
                <tr key={team.id}>
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
      <div
        className={clsx(c.hSeparator, { [c.isDragging]: isDragging })}
        onMouseDown={handleMouseDown}
      >
        <div className={c.resizeHandle} />
      </div>
      <aside
        className={c.aside}
        style={{ width: `calc(100% - ${width}px)` }}
      ></aside>
    </div>
  );
};

export default AdminApplicationsPage;
