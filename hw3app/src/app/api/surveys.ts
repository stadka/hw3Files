// This file is responsible for setting up the axios instance that will be used to make API calls to the backend.
// Completed by Matt Courchaine and Satwik Tadikamalla
import axios from "axios";

export const surveysApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});
