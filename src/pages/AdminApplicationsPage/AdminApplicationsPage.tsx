import { useRef, useState } from "react";
import c from "./AdminApplicationsPage.module.scss";
import clsx from "clsx";

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
        <header className={c.header}>Prijave</header>
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
