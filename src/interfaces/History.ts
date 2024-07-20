import { User } from "./User";

export interface History {
  id: string;
  user: User;
  isDengue: boolean;
  timestamp: number;
}
