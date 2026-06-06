import express from "express";
// import bodyParser from 'body-parser'; // Add this if not using express.json()

const app = express();

app.use(express.json());

import {
    FetchCurrentUser,
    getEmployeeChats,
    getGroupChats,
    getMessages,
    getLatestMessages,
    getLatestGroupMessage,
    sendMessage,
    createGroup,
    addGroupMember,
    getGroupMessages,
    sendGroupMessage,
    getAllEmployee,
    editMessage,
    deleteMessage,
} from "../api/connectSpace.js";

const router = express.Router();

router.get("/fetchcurrentuser", async (req, res) => {
    try {
        console.log("fetchcurrentuser endpoint called");
        console.log("Query params:", req.query);

        const { username, orgname, orgcode } = req.query;

        if (!username || !orgname || !orgcode) {
            console.error("Missing required parameters:", { username, orgname, orgcode });
            return res.status(400).json({
                error: 'Missing required parameters: username, orgname, and orgcode are required'
            });
        }

        const response = await FetchCurrentUser(username, orgname, orgcode);
        console.log("FetchCurrentUser response:", response);

        if (response && response.length > 0) {
            res.json(response);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error in fetchcurrentuser endpoint:', error);
        res.status(500).json({ error: 'Failed to fetch current user' });
    }
});

router.get("/employeechats", async (req, res) => {
    try {
        const { exclude, orgname, orgcode } = req.query;
        const response = await getEmployeeChats(exclude, orgname, orgcode);
        res.send(response);
    } catch (error) {
        console.error('Error fetching userkyctable for chat:', error);
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
});

router.get("/groupchats/:userId/", async (req, res) => {
    try {
        const { userId } = req.params;
        const response = await getGroupChats(userId);
        res.send(response);
    } catch (error) {
        console.error('Error fetching user groups:', error);
        res.status(500).json({ error: 'Failed to fetch groups' });
    }
});

router.get("/messages/:orgname/:orgcode/:senderId/:receiverId", async (req, res) => {
    try {
        const { orgname, orgcode, senderId, receiverId } = req.params;
        const response = await getMessages(orgname, orgcode, senderId, receiverId);
        res.send(response);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

router.get("/latest-messages/:orgname/:orgcode", async (req, res) => {
    try {
        const { orgname, orgcode } = req.params;

        // console.log("Fetching latest messages for:", { orgname, orgcode });

        const messages = await getLatestMessages(orgname, orgcode);

        // Ensure we always return proper JSON
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(messages);

    } catch (error) {
        console.error("Error:", error.stack);
        res.status(500).json({
            error: "Server error",
            details: error.message
        });
    }
});

router.get("/latest-group-messages/:orgname/:orgcode", async (req, res) => {
    try {
        const { orgname, orgcode } = req.params;

        // console.log("Fetching latest messages for:", { orgname, orgcode  });

        const messages = await getLatestGroupMessage(orgname, orgcode);

        // Ensure we always return proper JSON
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(messages);

    } catch (error) {
        console.error("Error:", error.stack);
        res.status(500).json({
            error: "Server error",
            details: error.message
        });
    }
});

// Alternative: If you want to create a dedicated route for latest messages only
// router.get('/latest-message/:orgname/:orgcode/:senderId/:receiverId', async (req, res) => {
//     console.log('Latest message request received:', {
//         params: req.params,
//         query: req.query
//     });

//     try {
//         const { orgname, orgcode, senderId, receiverId } = req.params;

//         if (!senderId || !receiverId) {
//             console.error('Invalid IDs:', { senderId, receiverId });
//             return res.status(400).json({ error: 'Missing user IDs' });
//         }

//         console.log('Fetching conversation between:', { senderId, receiverId });

//         // First find or create conversation
//         const [conversations] = await connection.execute(
//             `SELECT id FROM conversations 
//              WHERE (user1_id = ? AND user2_id = ?) 
//              OR (user1_id = ? AND user2_id = ?)`,
//             [senderId, receiverId, receiverId, senderId]
//         );

//         if (conversations.length === 0) {
//             console.log('No conversation found');
//             return res.json(null);
//         }

//         const conversationId = conversations[0].id;
//         console.log('Using conversation ID:', conversationId);

//         // Get the latest message
//         const [messages] = await connection.execute(
//             `SELECT m.*, u.fullname as sender_name
//              FROM messages m
//              LEFT JOIN userkyctable u ON m.sender_id = u.id
//              WHERE m.conversation_id = ?
//              ORDER BY m.created_at DESC
//              LIMIT 1`,
//             [conversationId]
//         );

//         if (messages.length === 0) {
//             console.log('No messages in conversation');
//             return res.json(null);
//         }

//         console.log('Latest message found:', messages[0]);
//         res.json(messages[0]);

//     } catch (error) {
//         console.error('Error stack:', error.stack);
//         res.status(500).json({ 
//             error: 'Server error',
//             details: error.message 
//         });
//     }
// });

router.post("/sendmessage", async (req, res) => {
    try {
        const { orgname, orgcode, sender_id, receiver_id, content } = req.body;
        console.log(req.body);
        if (!sender_id || !receiver_id || typeof content !== 'string') {
            return res.status(400).json({ error: 'Sender ID, Receiver ID, and message content are required' });
        }
        const response = await sendMessage(orgname, orgcode, sender_id, receiver_id, content);
        res.send(response);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

router.post("/creategroup", async (req, res) => {
    try {
        const { orgname, orgcode, name, created_by, members } = req.body;
        const response = await createGroup(orgname, orgcode, name, created_by, members);
        res.send(response);
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ error: 'Failed to create group' });
    }
});

router.post("/addgroupmember/:groupId/members", async (req, res) => {
    try {
        const { groupId } = req.params;
        const { orgname, orgcode, members } = req.body;
        const response = await addGroupMember(orgname, orgcode, groupId, members);
        res.send(response);
    } catch (error) {
        console.error('Error adding group member:', error);
        res.status(500).json({ error: error.message || 'Failed to add members' });
    }
});

// Add these routes to your backend router
router.get("/groupmessages/:orgname/:orgcode/:groupId", async (req, res) => {
    try {
        const { orgname, orgcode, groupId } = req.params;
        const response = await getGroupMessages(orgname, orgcode, groupId);
        res.send(response);
    } catch (error) {
        console.error('Error fetching group messages:', error);
        res.status(500).json({ error: 'Failed to fetch group messages' });
    }
});

router.post("/sendgroupmessage", async (req, res) => {
    try {
        const { orgname, orgcode, sender_id, group_id, content } = req.body;
        const response = await sendGroupMessage(orgname, orgcode, sender_id, group_id, content);
        res.send(response);
    } catch (error) {
        console.error('Error sending group message:', error);
        res.status(500).json({ error: 'Failed to send group message' });
    }
});

router.get("/allemployees", async (req, res) => {
    try {
        const { orgname, orgcode } = req.query;
        const employees = await getAllEmployee(orgname, orgcode);
        res.send(Array.isArray(employees) ? employees : []);
    } catch (error) {
        console.error("Error fetching employees for chat:", error);
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
});

router.patch("/messages/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const message = await editMessage(id, content);
        res.send(message);
    } catch (error) {
        res.status(500).json({ error: 'Failed to edit message' });
    }
});

router.delete("/messages/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteMessage(id);
        res.send(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete message' });
    }
});

export default router;