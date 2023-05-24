export interface Session {
  id: number;
  name: string;
  place: string;
  joinLimit: number;
  remainingNumber: number;
  isParking: boolean;
  isShuttle: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostSignup {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  joinNumber: number;
  isParking: boolean;
  isShuttle: boolean;
  sessionId: number;
}
