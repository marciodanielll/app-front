import { User } from "./index";

export interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  password: string | null;
  birthDate: string | null;
  phone: string | null;
  age: number | null;
  role: string | null;
}

export interface UserActions {
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
