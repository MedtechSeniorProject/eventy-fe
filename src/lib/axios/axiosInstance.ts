import axios from "axios";

export const axiosPrivate = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  export const pythonServer = axios.create({
    withCredentials: false,
    baseURL: "http://135.125.1.34:5000",
    headers: {
      'Content-Type': 'application/json',
    },
  });

