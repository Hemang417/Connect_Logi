import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();

export const cleanupExpiredLogins = async () => {
  const [userKYCs] = await connection.execute(
    `SELECT username, orgcode, tokenIssuedAt, 'userkyctable' AS tablename FROM userkyctable WHERE loggedin = 1`
  );

  const [users] = await connection.execute(
    `SELECT username, orgcode, tokenIssuedAt, 'users' AS tablename FROM users WHERE loggedin = 1`
  );

  const userLogins = [...userKYCs, ...users];

  const now = new Date();

  for (const user of userLogins) {
    const issuedAt = new Date(user.tokenIssuedAt);

    const tenHoursLater = new Date(issuedAt.getTime() + 10 * 60 * 60 * 1000);

    const midnight = new Date(issuedAt);
    midnight.setHours(24, 0, 0, 0); // Sets to midnight after login

    const expiresAt = new Date(Math.min(tenHoursLater.getTime(), midnight.getTime()));

    if (now > expiresAt) {
      const table = user.tablename;
      await connection.execute(
        `UPDATE ${table} SET loggedin = 0 WHERE username = ? AND orgcode = ?`,
        [user.username, user.orgcode]
      );
    }
  }
};