import { useStore } from "../store/store";

export const useUserId = () => useStore((state) => state.user.id);
export const useUserName = () => useStore((state) => state.user.name);
export const useUserEmail = () => useStore((state) => state.user.email);
export const useUserPassword = () => useStore((state) => state.user.password);
export const useUserBirthDate = () => useStore((state) => state.user.birthDate);
export const useUserPhone = () => useStore((state) => state.user.phone);
export const useUserAge = () => useStore((state) => state.user.age);
export const useUserRole = () => useStore((state) => state.user.role);

export const useSetUser = () => useStore((state) => state.user.setUser);
export const useSetUserName = () => useStore((state) => state.user.setName);
export const useSetUserEmail = () => useStore((state) => state.user.setEmail);
export const useSetUserPassword = () =>
  useStore((state) => state.user.setPassword);
export const useSetUserBirthDate = () =>
  useStore((state) => state.user.setBirthDate);
export const useSetUserPhone = () => useStore((state) => state.user.setPhone);
export const useSetUserAge = () => useStore((state) => state.user.setAge);
export const useSetUserRole = () => useStore((state) => state.user.setRole);
export const useClearUser = () => useStore((state) => state.user.clearUser);
