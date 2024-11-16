import axios from "axios";

const csrfToken = await axios.get(
  import.meta.env.VITE_API_ENDPOINT + "auth/csrf",
  { withCredentials: true }
);

export const apiInstance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    "csrf-token": csrfToken.data.csrfToken,
  },
});
