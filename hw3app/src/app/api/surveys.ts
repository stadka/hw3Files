// This file is responsible for setting up the axios instance that will be used to make API calls to the backend.
// Completed by Matt Courchaine and Satwik Tadikamalla
import axios from "axios";

export const surveysApi = axios.create({
  baseURL: "http://ec2-100-57-252-87.compute-1.amazonaws.com:30001",
  headers: {
    "Content-Type": "application/json",
  },
});
