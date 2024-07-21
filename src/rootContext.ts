import { createContext } from "react";
import { User } from "./interfaces";

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
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextInterface | undefined>(
  undefined
);
