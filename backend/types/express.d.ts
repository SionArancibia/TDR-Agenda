import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: Pick<User, 'id' | 'rut' | 'firstName' | 'lastName' | 'role' | 'gender'>;
    }
  }
}