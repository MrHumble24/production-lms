// src/middleware/tenantMiddleware.ts
import { Request, Response, NextFunction } from "express";

export const tenantMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const branchId = req.headers["branch-id"];

  if (!branchId) {
    return res
      .status(400)
      .json({ error: "Tenant ID and Branch ID are required" });
  }

  // Attach branchId to the request object for further use
  req.body.branchId = parseInt(branchId as string, 10);

  next();
};
