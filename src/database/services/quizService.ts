import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  FieldValue,
  getDocs,
  query,
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

const quizzesRef = collection(db, "quizzes");

export const createQuiz = async (quiz: Quiz) => {
  const docRef = await addDoc(quizzesRef, quiz);
  return { id: docRef.id, ...quiz };
};

export const getQuizzes = async () => {
  const q = query(quizzesRef);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Quiz[];
};

export const updateQuiz = async (id: string, quiz: Partial<Quiz>) => {
  const docRef = doc(db, "quizzes", id);
  await updateDoc(docRef, quiz);
};

export const deleteQuiz = async (id: string) => {
  const docRef = doc(db, "quizzes", id);
  await deleteDoc(docRef);
};
