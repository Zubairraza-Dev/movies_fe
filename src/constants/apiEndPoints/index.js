export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  "https://movies-rxcx.onrender.com/api/v1/";

const LOGIN = "auth/login";
const LOGOUT = "auth/logout";
const MOVIES = "/movies";

export { LOGIN, LOGOUT, MOVIES };
