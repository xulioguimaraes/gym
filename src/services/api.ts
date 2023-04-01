import { AppError } from "@utils/AppError";
import axios from "axios";

const api = axios.create({
  baseURL: "http://10.0.0.102:3333",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.response && error.response.data);
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(
        new AppError(error)
      );
    }
  }
);
export { api };
