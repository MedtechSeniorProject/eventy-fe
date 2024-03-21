import axios from "axios";

export const axiosPrivate = axios.create({
    baseURL: 'http://localhost:3000', // Base URL for your API
    headers: {
      'Content-Type': 'application/json',
    },
  });