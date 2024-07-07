import { createContext } from "react";

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
