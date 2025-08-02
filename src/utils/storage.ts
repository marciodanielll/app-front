export const StorageUtils = {
  clearAllData: () => {
    localStorage.removeItem("tcc-app-storage");
  },
  
  clearSensitiveData: () => {
    const stored = localStorage.getItem("tcc-app-storage");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.state) {
          delete parsed.state.auth;
          delete parsed.state.user;
          localStorage.setItem("tcc-app-storage", JSON.stringify(parsed));
        }
      } catch (error) {
        console.error("Error clearing sensitive data:", error);
        localStorage.removeItem("tcc-app-storage");
      }
    }
  },
  
  getStoredData: () => {
    const stored = localStorage.getItem("tcc-app-storage");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error("Error parsing stored data:", error);
        return null;
      }
    }
    return null;
  }
};