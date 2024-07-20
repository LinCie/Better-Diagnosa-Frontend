import { History } from "./History";

export interface User {
  id: string;
  username: string;
  roles: string[];
  histories: History[];
}
