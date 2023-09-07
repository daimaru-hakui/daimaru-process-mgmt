import { create } from "zustand";
import { Coefficient, Staff, User } from "../types";
import { UserInfo } from "firebase/auth";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

type Store = {
  session: UserInfo | null;
  setSession: (payload: UserInfo) => void;
  users: User[];
  setUsers: (payload: User[]) => void;
  staffs: Staff[];
  setStaffs: (paoload: Staff[]) => void;
  coefficients: Coefficient[];
  setCoefficients: (payload: Coefficient[]) => void;
  isSidebar: boolean;
  toggleSidebar: (payload: boolean) => void;
};

export const useStore = create<Store>((set) => ({
  session: null,
  setSession: (payload) => set(() => ({ session: payload })),
  users: [],
  setUsers: (payload) => set(() => ({ users: payload })),
  staffs: [],
  getStaffs: async () => {
    const staffsCollection = collection(db, "staffs");
    const snapShot = await getDocs(staffsCollection);
    const newStaffs = snapShot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as Staff)
    );
    set(() => ({ staffs: newStaffs }));
  },
  setStaffs: (payload) => set(() => ({ staffs: payload })),
  coefficients:[],
  getCoefficient: async () => {
    try {
      const coll = collection(db, "coefficients");
      const q = query(coll, orderBy("order", "desc"));
      const snapShot = await getDocs(q);
      const newCoefficients = snapShot.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id } as Coefficient)
      );
      set(() => ({ coefficients: newCoefficients }));
    } catch (error) {
      console.log(error)
    }
  },
  setCoefficients: (payload) => set(() => ({ coefficients: payload })),
  isSidebar: true,
  toggleSidebar: (payload) => set(() => ({ isSidebar: payload })),
}));
