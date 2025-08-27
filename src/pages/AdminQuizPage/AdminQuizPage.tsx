import type { ReactNode } from "react";
import c from "./AdminQuizPage.module.scss";
import HandWithCheckIcon from "../../assets/icons/hand-with-check.svg?react";
import { useParams } from "react-router-dom";

type CardDefinition = {
  title: string;
  Icon: ReactNode;
  message: string;
  color: string;
  href: string;
};

const AdminQuizPage = () => {
  const { id } = useParams();

  const cards: CardDefinition[] = [
    {
      title: "Postavke",
      Icon: <HandWithCheckIcon />,
      message: "Pregledajte i odobrite postavke.",
      color: "blue",
      href: `/admin/quiz/${id}/settings`,
    },
    {
      title: "Prijave",
      Icon: <HandWithCheckIcon />,
      message: "Pregledajte i odobrite prijave.",
      color: "red",
      href: `/admin/quiz/${id}/applications`,
    },
  ];

  return (
    <div className={c.pageWrapper}>
      <div className={c.titleWrapper}>
        <p className={c.leagueTitle}>Liga 2025./2026.</p>
        <h1 className={c.title}>Kviz općeg znanja</h1>
        <p className={c.date}>15. 9. u 19:00</p>
      </div>
      <div className={c.cards}>
        {cards.map((card) => (
          <div key={card.title} className={c.card}>
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
