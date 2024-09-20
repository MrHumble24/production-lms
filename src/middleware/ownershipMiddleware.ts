import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

/**
 * Middleware to ensure that the logged-in user can only access their own data.
 * @param role Role to check (e.g., "STUDENT")
 * @returns Middleware function for ensuring ownership.
 */
export const ensureOwnership = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: No token provided.",
      });
    }

    jwt.verify(token, JWT_SECRET, (err, user: any) => {
      if (err) {
        return res.status(403).json({
          message: "Unauthorized access. Invalid token.",
        });
      }

      const resourceId = req.params.id; // The ID of the resource (e.g., the student profile)

      // Ensure the user is trying to access their own data, or they are an admin
      if (
        user.role === role &&
        user.id !== resourceId &&
        user.role !== "COMPANY_OWNER"
      ) {
        return res.status(403).json({
          message: "You do not have ownership of this resource.",
        });
      }

      // Attach user to request and continue
      (req as any).user = user;
      next();
    });
  };
};
