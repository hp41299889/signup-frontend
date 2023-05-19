export interface Session {
  id: number;
  name: string;
  place: string;
  joinLimit: number;
  isParking: boolean;
  isShuttle: boolean;
  createdAt: Date;
  updatedAt: Date;
}
