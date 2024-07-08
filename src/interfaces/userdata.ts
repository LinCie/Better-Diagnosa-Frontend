import History from "./history";

interface UserData {
  id: number;
  username: string;
  roles: string[];
  history: number[] | History[];
}

export default UserData;
