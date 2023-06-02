import { signupApi } from "../util/request";
import { PostSignup } from "./interface";

// GET
export const getAllSessions = async () => {
  return await signupApi.get("/session");
};

export const getEmailVerify = async (id: string, hash: string) => {
  return await signupApi.get(`/verify/${id}?hash=${hash}`);
};

// POST
export const postSignup = async (data: PostSignup) => {
  return await signupApi.post("/signup", data);
};

// DELETE
export const deleteSignup = async (id: string) => {
  return await signupApi.delete(`/signup/${id}`);
};
