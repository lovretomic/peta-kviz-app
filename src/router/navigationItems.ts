export type NavigationItem = {
  name: string;
  path: string;
};

export const navigationItems: NavigationItem[] = [
  { name: "Quizzes", path: "/quizzes" },
  { name: "Leaderboard", path: "/leaderboard" },
  { name: "Application", path: "/apply" },
];
