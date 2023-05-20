import { signupApi } from "../util/request";
import { PostSignup } from "./interface";

export const getAllSessions = async () => {
  return await signupApi.get("/session");
};

export const postSignup = async (data: PostSignup) => {
  return await signupApi.post("/signup", data);
};
