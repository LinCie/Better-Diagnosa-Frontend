import { createContext } from "react";
import UserData from "./interfaces/userdata";

export interface LoginContextInterface {
  isLoggedIn: boolean;
  setIsLoggedIn: (state: boolean) => void;
}

export const LoginContext = createContext<LoginContextInterface | undefined>(
  undefined
);

export interface UsernameContextInterface {
  username: string;
  setUsername: (username: string) => void;
}

export const UsernameContext = createContext<
  UsernameContextInterface | undefined
>(undefined);

export interface UserContextInterface {
  user: UserData | undefined;
  setUser: (user: UserData | undefined) => void;
}

export const UserContext = createContext<UserContextInterface | undefined>(
  undefined
);
