import QuizzesIcon from "../assets/icons/building-blocks.svg";
import LeaderboardIcon from "../assets/icons/chart.svg";
import ApplicationIcon from "../assets/icons/hand-with-check.svg";

export type NavigationItem = {
  name: string;
  path: string;
  icon: string;
};

export const navigationItems: NavigationItem[] = [
  { name: "Kvizovi", path: "/", icon: QuizzesIcon },
  { name: "Rezultati", path: "/results", icon: LeaderboardIcon },
  { name: "Prijava", path: "/application", icon: ApplicationIcon },
];
