import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();
export const fetchAllusers = async (orgcode, orgname) => {
  try {
    const [rows] = await connection.execute(
      `
        SELECT *
        FROM userkyctable
        WHERE orgname = ? AND orgcode = ? And IsDeleted = 0
    `,
      [orgname, orgcode]
    );

    const [row] = await connection.execute(`SELECT * FROM setworkflow`);
    const [branchaccess] = await connection.execute(
      `SELECT * FROM branchaccess WHERE orgname = ? AND orgcode = ?`,
      [orgname, orgcode]
    );

    return {
      rows: rows,
      row: row,
      branchaccess: branchaccess,
    };
  } catch (error) {
    console.log(error);
  }
};

export const storeBranchAccessforUser = async (
  orgcode,
  orgname,
  ownbranchname,
  branchcode,
  username
) => {
  try {
    const [row] = await connection.execute(
      `INSERT INTO branchaccess (ownbranchname, branchcode, username, orgname, orgcode) VALUES (?,?,?,?,?)`,
      [ownbranchname, branchcode, username, orgname, orgcode]
    );
  } catch (error) {
    console.log(error);
  }
};

export const deletethatbranchaccess = async (branchcode, username) => {
  try {
    const [row] = await connection.execute(
      `DELETE FROM branchaccess WHERE branchcode = ? AND username = ?`,
      [branchcode , username]
    );
  } catch (error) {
    console.log(error);
  }
};

export const fetchExistingBranches = async (username, orgname, orgcode) => {
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM branchaccess WHERE orgname = ? AND orgcode = ? AND username = ?",
      [orgname, orgcode, username]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const fetchuseraccess = async (req, res) => {
  // ensure req.query exists
  const { username, orgname, orgcode, branchname, branchcode } =
    req.query || {};
  if (!username) {
    return res.status(400).json({ error: "Missing username" });
  }
  try {
    const [rows] = await connection.execute(
      `SELECT section, control
         FROM accesscontrol
        WHERE username=? AND orgname=? AND orgcode=? AND branchname=? AND branchcode=?`,
      [username, orgname, orgcode, branchname, branchcode]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch access" });
  }
};

export const updateuseraccess = async (req, res) => {
  const {
    username,
    orgname,
    orgcode,
    branchname,
    branchcode,
    changedby,
    selections = [],
  } = req.body || {};

  if (!username || !Array.isArray(selections)) {
    return res
      .status(400)
      .json({ error: "username and selections[] required" });
  }

  const conn = await connection.getConnection();
  await conn.beginTransaction();
  try {
    // 1) delete unchecked
    if (selections.length) {
      //   const keepList = selections.map((s) => `${s.section}|${s.control}`);
      await conn.query(
        `DELETE FROM accesscontrol
 WHERE username=? AND orgname=? AND orgcode=? AND branchname=? AND branchcode=?
   AND (section, control) NOT IN (${selections.map(() => "(?,?)").join(",")})`,
        [
          username,
          orgname,
          orgcode,
          branchname,
          branchcode,
          ...selections.flatMap((s) => [s.section, s.control]),
        ]
      );
    } else {
      await conn.query(
        `DELETE FROM accesscontrol
           WHERE username=? AND orgname=? AND orgcode=? AND branchname=? AND branchcode=?`,
        [username, orgname, orgcode, branchname, branchcode]
      );
    }
    // 2) insert new
    if (selections.length) {
      const placeholders = selections
        .map(() => "(?, ?, ?, ?, ?, ?, ?, ?)")
        .join(",");
      const params = selections.flatMap(({ section, control }) => [
        username,
        orgname,
        orgcode,
        branchname,
        branchcode,
        section,
        control,
        changedby,
      ]);
      await conn.query(
        `INSERT INTO accesscontrol 
 (username, orgname, orgcode, branchname, branchcode, section, control, changedby) 
 VALUES ${placeholders} 
 ON DUPLICATE KEY UPDATE 
   changedby=VALUES(changedby),
   section=VALUES(section),
   control=VALUES(control)`,
        params
      );
    }
    await conn.commit();
    return res.json({ message: "Access updated" });
  } catch (err) {
    await conn.rollback();
    console.error(err);
    return res.status(500).json({ error: "Failed to update access" });
  } finally {
    conn.release();
  }
};

export const fetchNavSections = async (req, res) => {
  const { username, orgname, orgcode, branchname, branchcode } = req.query || {};

  if (!username) {
    return res.status(400).json({ error: "Missing username" });
  }

  try {
    // 1. Fetch all unique sections
    const [rows] = await connection.execute(
      `SELECT DISTINCT section 
         FROM accesscontrol 
        WHERE username = ? AND orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ?`,
      [username, orgname, orgcode, branchname, branchcode]
    );

    // 2. Fetch all distinct delete-type controls
    const [deletecontrol] = await connection.execute(
      `SELECT DISTINCT control 
         FROM accesscontrol
        WHERE control LIKE 'delete%' AND username = ? AND orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ?`,
      [username, orgname, orgcode, branchname, branchcode]
    );

    // 3. Fetch approver list names
    const [approver] = await connection.execute(
      `SELECT DISTINCT approverlistname
         FROM approvername
        WHERE employeename = ? AND orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ?`,
      [username, orgname, orgcode, branchname, branchcode]
    );

    // 4. Return results in lowercase where applicable
    return res.json({
      sections: rows.map((r) => r.section?.toLowerCase()),
      deletecontrols: deletecontrol.map((r) => r.control?.toLowerCase()),
      approvers: approver.map((r) => r.approverlistname),
    });
  } catch (err) {
    console.error("Error in fetchNavSections:", err);
    return res.status(500).json({ error: "Failed to fetch nav sections" });
  }
};

export const getAccessControls = async (
  username,
  orgname,
  orgcode,
  branchname,
  branchcode,
  type,
) => {
  try {
    const [accessControls] = await connection.execute(
      `SELECT 
        section, control
      FROM accesscontrol 
      WHERE username = ? AND orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND section = ?`,
      [username, orgname, orgcode, branchname, branchcode, type]
    );
    return accessControls;
  } catch (error) {
    console.error("Error fetching access controls:", error);
  }
};

export const getBinAccessControls = async (
  username,
  orgname,
  orgcode,
  branchname,
  branchcode,
  typesArray
) => {
  try {
    // Create placeholders like (?, ?, ?, ...) based on array length
    const placeholders = typesArray.map(() => '?').join(',');

    const query = `
      SELECT section, control
      FROM accesscontrol 
      WHERE username = ? AND orgname = ? AND orgcode = ? 
        AND branchname = ? AND branchcode = ? 
        AND section IN (${placeholders})
    `;

    const values = [username, orgname, orgcode, branchname, branchcode, ...typesArray];

    const [accessControls] = await connection.execute(query, values);
    return accessControls;
  } catch (error) {
    console.error("Error fetching access controls:", error);
  }
};