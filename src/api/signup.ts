import { signupApi } from "../util/request";

export const getAllSessions = async () => {
  return await signupApi.get("/session");
};
