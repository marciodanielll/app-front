import { useUserStore } from "../store/userStore";

export const useUserId = () => useUserStore((state) => state.id);
export const useUserName = () => useUserStore((state) => state.name);
export const useUserEmail = () => useUserStore((state) => state.email);
export const useUserPassword = () => useUserStore((state) => state.password);
export const useUserBirthDate = () => useUserStore((state) => state.birthDate);
export const useUserPhone = () => useUserStore((state) => state.phone);
export const useUserAge = () => useUserStore((state) => state.age);
export const useUserRole = () => useUserStore((state) => state.role);

export const useUserActions = () =>
  useUserStore((state) => ({
    setUser: state.setUser,
    setName: state.setName,
    setEmail: state.setEmail,
    setPassword: state.setPassword,
    setBirthDate: state.setBirthDate,
    setPhone: state.setPhone,
    setAge: state.setAge,
    setRole: state.setRole,
    clearUser: state.clearUser,
  }));
