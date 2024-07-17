import History from "./history";

interface UserData {
  id: number;
  username: string;
  roles: string[];
  histories: History[];
}

export default UserData;
