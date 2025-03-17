import { Request } from "express";
import { User } from "../../domain/entities";

export interface RequestWithUser extends Request {
  user?: User;
}
