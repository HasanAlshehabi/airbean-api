import { getActiveUserId } from "../globalActiveUser/globalActiveUser.js";

export function requireAuth(req, res, next) {
  const userId = getActiveUserId();
  if (!userId) {
    return res.status(403).json({ error: 'Not logged in' });
  }
  next();
}