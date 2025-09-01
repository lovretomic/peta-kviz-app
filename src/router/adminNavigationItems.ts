import HomeIcon from "../assets/icons/home.svg?react";
import CardsStarIcon from "../assets/icons/cards-star.svg?react";
import BuildingBlocksIcon from "../assets/icons/building-blocks.svg?react";
import BarChart4BarsIcon from "../assets/icons/bar-chart-4-bars.svg?react";
import NotificationsIcon from "../assets/icons/notifications.svg?react";

export type NewNavigationItem = {
  name: string;
  path: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

export const adminNavigationItems: NewNavigationItem[] = [
  { name: "Kvizovi", path: "/admin", Icon: HomeIcon },
  { name: "Lige", path: "/admin/leagues", Icon: CardsStarIcon },
  { name: "Kvizevi", path: "/admin/all-quizzes", Icon: BuildingBlocksIcon },
  { name: "Statistike", path: "/admin/all-stats", Icon: BarChart4BarsIcon },
  { name: "Obavijesti", path: "/admin/notifications", Icon: NotificationsIcon },
];
