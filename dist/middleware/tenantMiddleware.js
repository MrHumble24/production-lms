"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenantMiddleware = void 0;
const tenantMiddleware = (req, res, next) => {
    const branchId = req.headers["branch-id"];
    if (!branchId) {
        return res
            .status(400)
            .json({ error: "Tenant ID and Branch ID are required" });
    }
    // Attach branchId to the request object for further use
    req.body.branchId = parseInt(branchId, 10);
    next();
};
exports.tenantMiddleware = tenantMiddleware;
