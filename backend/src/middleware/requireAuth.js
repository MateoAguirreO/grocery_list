
import { createClerkClient } from "@clerk/backend";
import dotenv from "dotenv";
dotenv.config();

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY
});

export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const { isSignedIn, sessionClaims } = await clerk.authenticateRequest(req);
    if (!isSignedIn) {
      return res.status(401).json({ message: "Invalid session" });
    }
    req.userId = sessionClaims.sub; // Clerk user ID
    next();
  } catch (err) {
    console.error("Auth failure:", err);
    res.status(401).json({ message: "Unauthorized", error: err.toString() });
  }
}
