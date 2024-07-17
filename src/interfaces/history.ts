import UserData from "./userdata";

interface History {
  id: string;
  user: number | UserData;
  isDengue: boolean;
  timestamp: number;
}

export default History;
