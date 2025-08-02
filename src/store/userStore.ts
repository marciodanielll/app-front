import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { User } from "./types";

interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  password: string | null;
  birthDate: string | null;
  phone: string | null;
  age: number | null;
  role: string | null;
}

interface UserActions {
  setUser: (user: User) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
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
      password: null,
      birthDate: null,
      phone: null,
      age: null,
      role: null,

      setUser: (user: User) =>
        set(
          {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            birthDate: user.birthDate,
            phone: user.phone,
            age: user.age,
            role: user.role,
          },
          false,
          "user/setUser"
        ),
      setName: (name: string) => set({ name }, false, "user/setName"),
      setEmail: (email: string) => set({ email }, false, "user/setEmail"),
      setPassword: (password: string) =>
        set({ password }, false, "user/setPassword"),
      setBirthDate: (birthDate: string) =>
        set({ birthDate }, false, "user/setBirthDate"),
      setPhone: (phone: string) => set({ phone }, false, "user/setPhone"),
      setAge: (age: number) => set({ age }, false, "user/setAge"),
      setRole: (role: string) => set({ role }, false, "user/setRole"),
      clearUser: () =>
        set(
          {
            id: null,
            name: null,
            email: null,
            password: null,
            birthDate: null,
            phone: null,
            age: null,
            role: null,
          },
          false,
          "user/clearUser"
        ),
    }),
    {
      name: "user-store",
    }
  )
);
