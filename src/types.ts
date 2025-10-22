export type User = {
  fullName: string;
  email: string;
};

export type QuizData = {
  id: number;
  title: string;
  league: string;
  date: Date;
  location: string;
  capacity: number;
  status: "upcoming" | "ongoing" | "completed";
  createdAt: Date;
  updatedAt: Date;
  organizer: string;
};
