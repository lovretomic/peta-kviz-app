import { useRef, useState } from "react";
import c from "./AdminApplicationsPage.module.scss";

const AdminApplicationsPage = () => {
  const leftRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startWidth, setStartWidth] = useState<number>(0);
  const [width, setWidth] = useState<number>(300);

  const handleMouseDown = () => {
    setIsDragging(true);
    setStartWidth(leftRef.current?.getBoundingClientRect().width || 0);
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
        {`startWidth: ${startWidth}
            width: ${width}
        `}
      </main>
      <div className={c.hSeparator} onMouseDown={handleMouseDown} />
      <aside
        className={c.aside}
        style={{ width: `calc(100% - ${width}px)` }}
      ></aside>
    </div>
  );
};

export default AdminApplicationsPage;
