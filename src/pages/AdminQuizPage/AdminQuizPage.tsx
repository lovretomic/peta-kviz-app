import type { ReactNode } from "react";
import c from "./AdminQuizPage.module.scss";
import HandWithCheckIcon from "../../assets/icons/hand-with-check.svg?react";
import SettingsIcon from "../../assets/icons/settings.svg?react";
import { useNavigate } from "react-router-dom";

type CardDefinition = {
  title: string;
  Icon: ReactNode;
  message: string;
  href: string;
};

const AdminQuizPage = () => {
  const navigate = useNavigate();

  const cards: CardDefinition[] = [
    {
      title: "Postavke",
      Icon: <SettingsIcon />,
      message: "Uređivanje naslova, datuma. Ostale postavke.",
      href: `settings`,
    },
    {
      title: "Prijave",
      Icon: <HandWithCheckIcon />,
      message: "Pregled i upravljanje prijavama.",
      href: `applications`,
    },
  ];

  return (
    <div className={c.pageWrapper}>
      <div className={c.titleWrapper}>
        <p className={c.leagueTitle}>Liga 2025./2026.</p>
        <h1 className={c.title}>Kviz općeg znanja</h1>
        <p className={c.date}>15. 9. u 19:00</p>
        <div className={c.progressBar}>
          <div className={c.progress} style={{ width: "50%" }} />
        </div>
        <p className={c.progressText}>Popunjeno 50% mjesta (10/20)</p>
      </div>
      <div className={c.cards}>
        {cards.map((card) => (
          <div
            key={card.title}
            className={c.card}
            onClick={() => navigate(card.href)}
          >
            <div className={c.icon}>{card.Icon}</div>
            <h2 className={c.title}>{card.title}</h2>
            <p className={c.message}>{card.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminQuizPage;
