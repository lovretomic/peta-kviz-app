import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  FieldValue,
  getDocs,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";

export type Team = {
  id?: string;
  teamName: string;
  captainName: string;
  captainEmail: string;
  members: string[];
  applicationDate: FieldValue | Date | Timestamp;
  updatedAt: FieldValue | Date | Timestamp;
};

export const createTeam = async (
  team: Team,
  quizId: string,
  leagueId: string
) => {
  const teamsRef = collection(
    db,
    "leagues",
    leagueId,
    "quizzes",
    quizId,
    "teams"
  );
  const docRef = await addDoc(teamsRef, team);
  return { id: docRef.id, ...team };
};

export const getTeams = async (quizId: string, leagueId: string) => {
  const teamsRef = collection(
    db,
    "leagues",
    leagueId,
    "quizzes",
    quizId,
    "teams"
  );
  const snapshot = await getDocs(teamsRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Team[];
};

export const updateTeam = async (
  id: string,
  team: Partial<Team>,
  quizId: string,
  leagueId: string
) => {
  const docRef = doc(db, "leagues", leagueId, "quizzes", quizId, "teams", id);
  await updateDoc(docRef, team);
};

export const deleteTeam = async (
  id: string,
  quizId: string,
  leagueId: string
) => {
  const docRef = doc(db, "leagues", leagueId, "quizzes", quizId, "teams", id);
  await deleteDoc(docRef);
};
