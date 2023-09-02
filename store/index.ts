import { create } from 'zustand';
import { User } from "../types";
import { UserInfo } from 'firebase/auth';

type Store = {
  session: UserInfo | null
  setSession:(payload:UserInfo)=>void
  users: User[];
  setUsers: (payload: User[]) => void;
  isSidebar: boolean;
  toggleSidebar: (payload: boolean) => void;
};

export const useStore = create<Store>((set) => ({
  session: null,
  setSession: (payload) => set(() => ({ session: payload })),
  users: [],
  setUsers: (payload) => set(() => ({ users: payload })),
  isSidebar: true,
  toggleSidebar: (payload) => set(() => ({ isSidebar: payload }))
}))

