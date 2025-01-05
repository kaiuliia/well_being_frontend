export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.wellbeing.rusanova.eu"
    : "http://localhost:9090";
