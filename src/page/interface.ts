import { PostSignup } from "../api/interface";

export interface SignupFormData extends PostSignup {
  extraJoinNumber: number;
}
