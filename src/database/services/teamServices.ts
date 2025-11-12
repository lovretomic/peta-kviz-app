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

export type Round = {
  order: number;
  points: number;
};

export type Team = {
  id?: string;
  teamName: string;
  captainName: string;
  captainEmail: string;
  members: string[];
  applicationDate: FieldValue | Date | Timestamp;
  updatedAt: FieldValue | Date | Timestamp;
  rounds?: Round[];
};

export type TeamWithRounds = {
  id: string;
  teamName: string;
  rounds: Round[];
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

export const getTeamsWithRounds = async (quizId: string, leagueId: string) => {
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
    teamName: doc.data().teamName,
    rounds: doc.data().rounds || [],
  })) as TeamWithRounds[];
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

const normalizeRounds = (data: TeamWithRounds[]): TeamWithRounds[] => {
  if (data.length === 0) return [];

  const normalized: TeamWithRounds[] = [];

  const maxRoundOrder = Math.max(
    ...data.flatMap((team) => team.rounds.map((round) => round.order))
  );

  for (const team of data) {
    const normalizedTeam: TeamWithRounds = {
      id: team.id,
      teamName: team.teamName,
      rounds: [],
    };

    for (let order = 1; order <= maxRoundOrder; order++) {
      const round = team.rounds.find((r) => r.order === order);
      if (round) {
        normalizedTeam.rounds.push(round);
      } else {
        normalizedTeam.rounds.push({ order, points: 0 });
      }
    }

    normalized.push(normalizedTeam);
  }

  return normalized;
};

export const updateTeamsRounds = async (
  data: TeamWithRounds[],
  quizId: string,
  leagueId: string
) => {
  const normalizedData = normalizeRounds(data);

  const updatePromises = normalizedData.map((team) => {
    const docRef = doc(
      db,
      "leagues",
      leagueId,
      "quizzes",
      quizId,
      "teams",
      team.id
    );
    return updateDoc(docRef, { rounds: team.rounds });
  });

  await Promise.all(updatePromises);
};

export const deleteTeam = async (
  id: string,
  quizId: string,
  leagueId: string
) => {
  const docRef = doc(db, "leagues", leagueId, "quizzes", quizId, "teams", id);
  await deleteDoc(docRef);
};
