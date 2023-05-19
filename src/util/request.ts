import axios, { AxiosInstance } from "axios";

const request = (baseUrl = ""): AxiosInstance => {
  const instance = axios.create({
    baseURL: baseUrl,
  });
  return instance;
};

export const signupApi = request(process.env.REACT_APP_SIGNUP_API_BASE_URL);
