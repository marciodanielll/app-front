export const environment = {
  baseUrl: process.env.REACT_APP_BASE_URL || "http://localhost:8080",
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
};

export default environment;
