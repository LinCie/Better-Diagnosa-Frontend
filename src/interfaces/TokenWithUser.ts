import { Token } from "./Token";
import { User } from "./User";

export interface TokenWithUser extends Token {
  user: User;
}
