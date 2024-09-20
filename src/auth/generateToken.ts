import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

/**
 * Generates a JWT for a given user.
 * @param userId The user's unique identifier.
 * @returns The generated JWT.
 */

export const generateToken = (userId: string, others?: any): string => {
  const payload = { id: userId, ...others };
  const options = { expiresIn: "48h" };

  return jwt.sign(payload, JWT_SECRET, options);
};
