import UserData from "./userdata";

interface History {
  id: number;
  user: number | UserData;
  isDengue: boolean;
  timestamp: number;
}

export default History;
