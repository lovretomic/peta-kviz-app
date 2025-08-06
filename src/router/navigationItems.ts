import QuizzesIcon from "../assets/icons/building-blocks.svg";
import LeaderboardIcon from "../assets/icons/chart.svg";
import ApplicationIcon from "../assets/icons/hand-with-check.svg";

export type NavigationItem = {
  name: string;
  path: string;
  icon: string;
};

export const navigationItems: NavigationItem[] = [
  { name: "Kvizevi", path: "/quizzes", icon: QuizzesIcon },
  { name: "Ljestvica", path: "/leaderboard", icon: LeaderboardIcon },
  { name: "Prijava", path: "/apply", icon: ApplicationIcon },
];
