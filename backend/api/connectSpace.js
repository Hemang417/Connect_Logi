import { connectMySQL } from "../config/sqlconfig.js";

const connection = await connectMySQL();

export const FetchCurrentUser = async (username, orgname, orgcode) => {
  try {
    console.log("FetchCurrentUser called with:", {
      username,
      orgname,
      orgcode,
    });

    if (!username || !orgname || !orgcode) {
      console.error("Missing required parameters for FetchCurrentUser");
      return [];
    }

    const [rows] = await connection.execute(
      `SELECT id, fullname, username FROM userkyctable WHERE username = ? AND orgname = ? AND orgcode = ?`,
      [username, orgname, orgcode]
    );

    console.log("FetchCurrentUser SQL result:", rows);

    if (rows && rows.length > 0) {
      console.log("User found:", rows[0]);
      return rows; // Return the array as expected
    } else {
      console.log("No user found with provided credentials");
      return [];
    }
  } catch (error) {
    console.error("Error in FetchCurrentUser:", error);
    throw error; // Throw error instead of returning it
  }
};

export const getEmployeeChats = async (exclude, orgname, orgcode) => {
  try {
    const [employeechats] = await connection.execute(
      `SELECT id, fullname, username, profilephoto FROM userkyctable 
      WHERE id != ? AND IsDeleted = 0 AND orgname = ? AND orgcode = ?
      ORDER BY fullname ASC`,
      [exclude, orgname, orgcode]
    );
    return employeechats;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getGroupChats = async (userId) => {
  try {
    const [groupchats] = await connection.execute(
      `SELECT DISTINCT c.id, c.name, c.created_at, c.created_by FROM conversations c
                INNER JOIN conversation_employees cm ON c.id = cm.conversation_id
                WHERE c.is_group = 1 AND cm.user_id = ?
                ORDER BY c.created_at DESC`,
      [userId]
    );
    return groupchats;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getMessages = async (orgname, orgcode, senderId, receiverId) => {
  try {
    console.log("getMessages called with:", { senderId, receiverId });

    if (!senderId || !receiverId) {
      console.error("Missing senderId or receiverId");
      return [];
    }

    let conversationId = await findOrCreateConversation(
      orgname,
      orgcode,
      senderId,
      receiverId
    );
    console.log("Found/Created conversation ID:", conversationId);

    const [messages] = await connection.execute(
      `SELECT m.*, u.fullname as sender_name
                FROM messages m
                LEFT JOIN userkyctable u ON m.sender_id = u.id
                WHERE m.conversation_id = ?
                ORDER BY m.created_at ASC`,
      [conversationId]
    );

    console.log("Messages retrieved length :", messages.length);
    console.log("Messages retrieved:", messages);
    return messages || [];
  } catch (error) {
    console.error("Error in getMessages:", error);
    return [];
  }
};

export const getLatestMessages = async (orgname, orgcode) => {
  try {
    const [rows] = await connection.execute(
      `SELECT 
  m.id,
  m.content,
  m.created_at,
  m.sender_id,
  m.receiver_id,
  m.deleted_at,
  m.conversation_id,
  u1.fullname AS sender_name,
  u1.username AS sender_username,
  u2.username AS receiver_username
FROM messages m
JOIN (
  SELECT 
    conversation_id, 
    MAX(created_at) AS latest_date
  FROM messages
  WHERE orgname = ? AND orgcode = ?
  GROUP BY conversation_id
) latest ON m.conversation_id = latest.conversation_id 
         AND m.created_at = latest.latest_date
LEFT JOIN userkyctable u1 ON m.sender_id = u1.id
LEFT JOIN userkyctable u2 ON m.receiver_id = u2.id
WHERE m.orgname = ? AND m.orgcode = ?
ORDER BY m.created_at DESC
`,
      [orgname, orgcode, orgname, orgcode]
    );

    return rows;
  } catch (error) {
    console.error("Database error:", error);
    throw error; // Let the router handle it
  }
};

export const getLatestGroupMessage = async (orgname, orgcode) => {
  try {
    const [rows] = await connection.execute(
      `
SELECT m.id, m.content, m.created_at, m.sender_id,
       u.fullname AS sender_name,
       u.username AS sender_username,
       m.conversation_id AS group_id
      FROM messages m
      JOIN conversations c ON m.conversation_id = c.id
      LEFT JOIN userkyctable u ON m.sender_id = u.id
      WHERE c.is_group = 1
        AND c.orgname = ? AND c.orgcode = ?
        AND m.created_at = (
          SELECT MAX(m2.created_at)
          FROM messages m2
          WHERE m2.conversation_id = m.conversation_id
        )
      ORDER BY m.created_at DESC
      `,
      [orgname, orgcode]
    );

    return rows || [];
  } catch (error) {
    console.error("Error fetching latest group messages:", error);
    throw error;
  }
};

export const sendMessage = async (
  orgname,
  orgcode,
  senderId,
  receiverId,
  message
) => {
  try {
    console.log("sendMessage called with:", {
      orgname,
      orgcode,
      senderId,
      receiverId,
      message,
    });

    if (!senderId || !receiverId) {
      throw new Error("Missing senderId or receiverId");
    }

    let conversationId = await findOrCreateConversation(
      orgname,
      orgcode,
      senderId,
      receiverId
    );
    console.log("Using conversation ID:", conversationId);

    const [result] = await connection.execute(
      ` INSERT INTO messages (orgname, orgcode, conversation_id, sender_id,receiver_id, content, created_at)
                VALUES (?, ?, ?, ?,?, ?, NOW())`,
      [orgname, orgcode, conversationId, senderId, receiverId, message || null]
    );

    console.log("Message inserted with ID:", result.insertId);

    const [newMessages] = await connection.execute(
      ` SELECT m.*, u.fullname as sender_name
                FROM messages m
                LEFT JOIN userkyctable u ON m.sender_id = u.id
                WHERE m.id = ?`,
      [result.insertId]
    );

    console.log("New message retrieved:", newMessages[0]);
    return newMessages[0];
  } catch (error) {
    console.error("Error in sendMessage:", error);
    throw error;
  }
};

export const createGroup = async (
  orgname,
  orgcode,
  name,
  created_by,
  members
) => {
  try {
    if (!name || !created_by || !Array.isArray(members)) {
      throw new Error("Missing name, created_by, members");
    }

    const [conversation] = await connection.execute(
      `INSERT INTO conversations (orgname, orgcode, is_group, name, created_by, created_at)
             VALUES (?, ?, 1, ?, ?, NOW())`,
      [orgname, orgcode, name, created_by]
    );

    const conversationId = conversation.insertId;

    if (!members.includes(parseInt(created_by))) {
      members.push(parseInt(created_by));
    }

    await Promise.all(
      members.map((member) =>
        connection.execute(
          `INSERT INTO conversation_employees (orgname, orgcode, conversation_id, user_id)
                 VALUES (?, ?, ?, ?)`,
          [orgname, orgcode, conversationId, member]
        )
      )
    );

    const [groups] = await connection.execute(
      `SELECT * FROM conversations WHERE id = ?`,
      [conversationId]
    );

    return groups[0]; // return just the group
  } catch (error) {
    console.error("Error Creating Group", error);
    throw error;
  }
};

export const addGroupMember = async (orgname, orgcode, groupId, members) => {
  try {
    if (!Array.isArray(members) || members.length === 0) {
      throw new Error("Members array is required");
    }

    const [groupexists] = await connection.execute(
      `SELECT id FROM conversations WHERE id = ? AND is_group = 1`,
      [groupId]
    );

    if (groupexists.length === 0) {
      throw new Error("Invalid group ID");
    }

    for (const memberId of members) {
      await connection.execute(
        ` INSERT IGNORE INTO conversation_employees (orgname, orgcode, conversation_id, user_id)
                  VALUES (?, ?,?, ?)`,
        [orgname, orgcode, groupId, memberId]
      );
    }

    return { message: "Members added successfully" };
  } catch (error) {
    console.error("Error adding group members:", error);
    throw error;
  }
};

// Add these functions to your connectSpace.js API file
export const getGroupMessages = async (orgname, orgcode, groupId) => {
  try {
    const [messages] = await connection.execute(
      `SELECT m.*, u.fullname as sender_name
                FROM messages m
                LEFT JOIN userkyctable u ON m.sender_id = u.id
                WHERE m.conversation_id = ?
                ORDER BY m.created_at ASC`,
      [groupId]
    );
    return messages || [];
  } catch (error) {
    console.error("Error fetching group messages:", error);
    throw error;
  }
};

export const sendGroupMessage = async (
  orgname,
  orgcode,
  senderId,
  groupId,
  content
) => {
  try {
    if (!senderId || !groupId) {
      throw new Error("Missing senderId or groupId");
    }

    const [result] = await connection.execute(
      `INSERT INTO messages (orgname, orgcode, conversation_id, sender_id, content, created_at)
             VALUES (?, ?, ?, ?, ?, NOW())`,
      [orgname, orgcode, groupId, senderId, content || null]
    );

    const [newMessage] = await connection.execute(
      `SELECT m.*, u.fullname as sender_name
             FROM messages m
             LEFT JOIN userkyctable u ON m.sender_id = u.id
             WHERE m.id = ?`,
      [result.insertId]
    );

    return newMessage[0];
  } catch (error) {
    console.error("Error sending group message:", error);
    throw error;
  }
};

export const getAllEmployee = async (orgname, orgcode) => {
  try {
    const [employees] = await connection.execute(
      `SELECT id, fullname, username, profilephoto FROM userkyctable WHERE orgname = ? AND orgcode = ? ORDER BY fullname ASC`,
      [orgname, orgcode]
    );
    return employees;
  } catch (error) {
    console.error("getAllEmployee error:", error);
    return []; // ✅ Return empty array on failure
  }
};

async function findOrCreateConversation(orgname, orgcode, user1Id, user2Id) {
  try {
    // Look for existing conversation between these two users
    const findQuery = `
            SELECT DISTINCT c.id
            FROM conversations c
            INNER JOIN conversation_employees cm1 ON c.id = cm1.conversation_id
            INNER JOIN conversation_employees cm2 ON c.id = cm2.conversation_id
            WHERE c.is_group = 0 
            AND cm1.user_id = ? 
            AND cm2.user_id = ?
            AND (
                SELECT COUNT(*) FROM conversation_employees 
                WHERE conversation_id = c.id
            ) = 2
        `;

    const [existing] = await connection.execute(findQuery, [user1Id, user2Id]);

    if (existing.length > 0) {
      return existing[0].id;
    }

    // Create new conversation
    const createQuery = `
            INSERT INTO conversations (orgname, orgcode, is_group, created_by, created_at)
            VALUES (?, ?, 0, ?, NOW())
        `;

    const [result] = await connection.execute(createQuery, [
      orgname,
      orgcode,
      user1Id,
    ]);
    const conversationId = result.insertId;

    // Add both users as members
    const memberQuery = `
            INSERT INTO conversation_employees (orgname, orgcode, conversation_id, user_id)
            VALUES (?, ?, ?, ?)
        `;

    await connection.execute(memberQuery, [
      orgname,
      orgcode,
      conversationId,
      user1Id,
    ]);
    await connection.execute(memberQuery, [
      orgname,
      orgcode,
      conversationId,
      user2Id,
    ]);

    return conversationId;
  } catch (error) {
    console.error("Error in findOrCreateConversation:", error);
    throw error;
  }
}

// Add edit and delete functions
const getMessagesbyId = async (messageId) => {
  try {
    const [messages] = await connection.execute(
      `SELECT m.*, u.fullname as sender_name
                FROM messages m
                LEFT JOIN userkyctable u ON m.sender_id = u.id
                WHERE m.id = ? AND m.deleted_at IS NULL`,
      [messageId]
    );
    return messages[0] || null;
  } catch (error) {
    console.error("Error fetching message by ID:", error);
    throw error;
  }
};

export const editMessage = async (messageId, newContent) => {
  await connection.execute(
    `UPDATE messages SET content = ? 
     WHERE id = ?`,
    [newContent, messageId]
  );
  return getMessagesbyId(messageId);
};

export const deleteMessage = async (messageId) => {
  await connection.execute(
    `UPDATE messages SET deleted_at = NOW() 
     WHERE id = ?`,
    [messageId]
  );
  return { id: messageId, deleted: true };
};
