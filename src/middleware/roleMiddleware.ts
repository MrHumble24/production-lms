import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

/**
 * Middleware to verify JWT token and authorize user by role.
 * @param roles Array of roles that are allowed to access the route.
 */
export const authorizeRoles = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1]; // Simplified token extraction

    // Check if the token exists
    if (!token) {
      return res.status(401).json({
        message:
          "Unauthorized: No token provided. Please log in to access this resource.",
      });
    }

    // Verify the JWT token
    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) {
        return handleTokenError(err, res);
      }

      // Check if the user has the required role
      if (!roles.includes(user.role)) {
        return res.status(403).json({
          message:
            "Access denied: You do not have sufficient permissions to access this resource.",
        });
      }

      // Attach the user to the request object and proceed
      (req as any).user = user;
      next();
    });
  };
};

/**
 * Helper function to handle JWT token errors.
 * @param err JWT error object
 * @param res Express response object
 */
const handleTokenError = (err: any, res: Response) => {
  let errorMessage = "Unauthorized access. Please try again.";

  switch (err.name) {
    case "TokenExpiredError":
      errorMessage = "Session expired. Please log in again.";
      break;
    case "JsonWebTokenError":
      errorMessage = "Invalid token. Please log in again.";
      break;
    case "NotBeforeError":
      errorMessage = "Token is not active yet. Please check the start time.";
      break;
  }

  return res.status(403).json({ message: errorMessage });
};
