import History from "./history";

interface UserData {
  id: string;
  username: string;
  roles: string[];
  histories: History[];
}

export default UserData;
