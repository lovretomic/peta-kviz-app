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

export type Quiz = {
  id?: string;
  title: string;
  time: FieldValue | Date | Timestamp;
  updatedAt: FieldValue | Date | Timestamp;
};

export const createQuiz = async (quiz: Quiz, leagueId: string) => {
  const quizzesRef = collection(db, "leagues", leagueId, "quizzes");
  const docRef = await addDoc(quizzesRef, quiz);
  return { id: docRef.id, ...quiz };
};

export const getQuizzes = async (leagueId: string) => {
  const quizzesRef = collection(db, "leagues", leagueId, "quizzes");
  const snapshot = await getDocs(quizzesRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Quiz[];
};

export const updateQuiz = async (
  id: string,
  quiz: Partial<Quiz>,
  leagueId: string
) => {
  const docRef = doc(db, "leagues", leagueId, "quizzes", id);
  await updateDoc(docRef, quiz);
};

export const deleteQuiz = async (id: string, leagueId: string) => {
  const docRef = doc(db, "leagues", leagueId, "quizzes", id);
  await deleteDoc(docRef);
};
