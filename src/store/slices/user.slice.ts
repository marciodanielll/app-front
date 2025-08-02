import { StateCreator } from "zustand";
import { UserState, UserActions } from "../../types/user";
import { AuthState, AuthActions } from "../../types/auth";
import { AppState, AppActions } from "../../types/app";

export const initialUserState: UserState = {
  id: null,
  name: null,
  email: null,
  password: null,
  birthDate: null,
  phone: null,
  age: null,
  role: null,
};

interface CombinedStore {
  auth: AuthState & AuthActions;
  user: UserState & UserActions;
  app: AppState & AppActions;
  resetAll: () => void;
}

export const createUserSlice: StateCreator<
  CombinedStore,
  [["zustand/devtools", never]],
  [],
  UserState & UserActions
> = (set) => ({
  ...initialUserState,

  setUser: (user) =>
    set(
      (state: CombinedStore) => ({
        user: {
          ...state.user,
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          birthDate: user.birthDate,
          phone: user.phone,
          age: user.age,
          role: user.role,
        },
      }),
      false,
      "user/setUser"
    ),

  setName: (name: string) =>
    set(
      (state: CombinedStore) => ({
        user: { ...state.user, name },
      }),
      false,
      "user/setName"
    ),

  setEmail: (email: string) =>
    set(
      (state: CombinedStore) => ({
        user: { ...state.user, email },
      }),
      false,
      "user/setEmail"
    ),

  setPassword: (password: string) =>
    set(
      (state: CombinedStore) => ({
        user: { ...state.user, password },
      }),
      false,
      "user/setPassword"
    ),

  setBirthDate: (birthDate: string) =>
    set(
      (state: CombinedStore) => ({
        user: { ...state.user, birthDate },
      }),
      false,
      "user/setBirthDate"
    ),

  setPhone: (phone: string) =>
    set(
      (state: CombinedStore) => ({
        user: { ...state.user, phone },
      }),
      false,
      "user/setPhone"
    ),

  setAge: (age: number) =>
    set(
      (state: CombinedStore) => ({
        user: { ...state.user, age },
      }),
      false,
      "user/setAge"
    ),

  setRole: (role: string) =>
    set(
      (state: CombinedStore) => ({
        user: { ...state.user, role },
      }),
      false,
      "user/setRole"
    ),

  clearUser: () =>
    set(
      (state: CombinedStore) => ({
        user: { ...state.user, ...initialUserState },
      }),
      false,
      "user/clearUser"
    ),
});
