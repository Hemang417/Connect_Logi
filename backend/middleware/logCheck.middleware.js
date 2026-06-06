import jwt from "jsonwebtoken";
import { connectMySQL } from "../config/sqlconfig.js";
export const loginCheckToken = async (req, res, next) => {
  const SECRET_KEY = process.env.JWT_SECRET;
  if (!SECRET_KEY) {
    console.error("❌ JWT_SECRET is missing from environment variables. msg from middleware");
    return res.status(500).json({ error: "Internal server error: JWT_SECRET is missing." });
  }

  try {
    const authHeader = req.headers["userauthtoken"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    jwt.verify(token, SECRET_KEY, async (err, userData) => {
      const connection = await connectMySQL(); // 🛠 Per-request connection

      if (err) {
        // If token has some data, try to clean up
        if (userData && userData.username && userData.orgcode) {
          const tableName = userData.username === "admin" ? "users" : "userkyctable";
          await connection.execute(
            `UPDATE ${tableName} SET loggedin = 0 WHERE username = ? AND orgcode = ?`,
            [userData.username, userData.orgcode]
          );
        }

        return res.status(401).json({ error: "Token expired or invalid" });
      }

      req.user = userData;
      next();
    });
  } catch (error) {
    console.error("❌ loginCheckToken middleware error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
