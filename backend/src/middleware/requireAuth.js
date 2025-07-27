import { getAuth } from "@clerk/express";

export function requireAuth(req, res, next) {
  const auth = getAuth(req);

  if (!auth || !auth.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.userId = auth.userId;
  next();
}