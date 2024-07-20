import History from "./history";

interface User {
  id: string;
  username: string;
  roles: string[];
  histories: History[];
}

export default User;
