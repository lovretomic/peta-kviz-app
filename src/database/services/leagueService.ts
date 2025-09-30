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

export type League = {
  id?: string;
  name: string;
  updatedAt: FieldValue | Date | Timestamp;
};

const leaguesRef = collection(db, "leagues");

export const createLeague = async (league: League) => {
  const docRef = await addDoc(leaguesRef, league);
  return { id: docRef.id, ...league };
};

export const getLeagues = async () => {
  const q = query(leaguesRef);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as League[];
};

export const updateLeague = async (id: string, league: Partial<League>) => {
  const docRef = doc(db, "leagues", id);
  await updateDoc(docRef, league);
};

export const deleteLeague = async (id: string) => {
  const docRef = doc(db, "leagues", id);
  await deleteDoc(docRef);
};
