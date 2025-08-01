import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { User } from "./types";

interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  birthDate: string | null;
  phone: string | null;
  age: number | null;
  role: string | null;
}

interface UserActions {
  setUser: (user: User) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setBirthDate: (birthDate: string) => void;
  setPhone: (phone: string) => void;
  setAge: (age: number) => void;
  setRole: (role: string) => void;
  clearUser: () => void;
}

interface UserStore extends UserState, UserActions {}

export const useUserStore = create<UserStore>()(
  devtools(
    (set) => ({
      id: null,
      name: null,
      email: null,
      birthDate: null,
      phone: null,
      age: null,
      role: null,

      setUser: (user: User) =>
        set({
          id: user.id,
          name: user.name,
          email: user.email,
          birthDate: user.birthDate,
          phone: user.phone,
          age: user.age,
          role: user.role,
        }),
      setName: (name: string) => set({ name }),
      setEmail: (email: string) => set({ email }),
      setBirthDate: (birthDate: string) => set({ birthDate }),
      setPhone: (phone: string) => set({ phone }),
      setAge: (age: number) => set({ age }),
      setRole: (role: string) => set({ role }),
      clearUser: () =>
        set({
          id: null,
          name: null,
          email: null,
          birthDate: null,
          phone: null,
          age: null,
          role: null,
        }),
    }),
    {
      name: "user-store",
    }
  )
);
