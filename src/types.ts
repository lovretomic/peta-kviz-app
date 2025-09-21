export type User = {
  fullName: string;
  email: string;
};

export type Team = {
  id: number;
  name: string;
  captainName: string;
  captainEmail: string;
  members: string[];
  applicationDate: Date;
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
