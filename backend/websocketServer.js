// websocketServer.js
import dotenv from "dotenv";
import path from "path";
import http from "http";
import express from "express";
import { Server } from "socket.io";

const envFilePath = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || "development"}`);
const result = dotenv.config({ path: envFilePath });

if (result.error) {
    throw new Error(`Failed to load .env file at ${envFilePath}`);
}

const app = express();
const server = http.createServer(app);
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;

const io = new Server(server, {
    cors: {
        origin: FRONTEND_ORIGIN,
        methods: ["GET", "POST"],
    },
    pingTimeout: 60000,
    pingInterval: 25000,
    maxHttpBufferSize: 1e8, // 100MB
    connectTimeout: 30000
});

const users = new Map(); // username => socket.id

io.on("connection", (socket) => {
    // console.log(`User connected: ${socket.id}`);

    socket.on("register", (username) => {
        users.set(username, socket.id);
        // console.log(`${username} registered with socket ID: ${socket.id}`);
    });

    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        // console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    socket.on("chatMessage", ({ roomId, message }) => {
        if (roomId) {
            // Broadcast to entire room including sender
            io.to(roomId).emit("receiveMessage", message);
        }
    });

    socket.on("joinGroup", (groupId) => {
        const roomId = `group_${groupId}`;
        socket.join(roomId);
        // console.log(`Socket ${socket.id} joined group room ${roomId}`);
    });

    socket.on("disconnect", () => {
        for (const [username, id] of users.entries()) {
            if (id === socket.id) {
                users.delete(username);
                break;
            }
        }
        // console.log(`User disconnected: ${socket.id}`);
    });

    socket.on("updateMessage", ({ roomId, message }) => {
        io.to(roomId).emit("messageUpdated", message);
    });

    socket.on("deleteMessage", ({ roomId, messageId }) => {
        io.to(roomId).emit("messageDeleted", messageId);
    });

});

// ✅ Export the `broadcast` function to send a message to a specific user
export const broadcast = ({ username, type, message }) => {
    const socketId = users.get(username);
    if (socketId) {
        io.to(socketId).emit("notification", { type, message });
        // console.log(`Notification sent to ${username}:`, { type, message });
    } else {
        // console.log(`User ${username} not connected, message not sent.`);
    }
};

server.listen(8081, () => {
    console.log("Socket.IO server running on port 8081");
    console.log(`FRONTEND_ORIGIN_URL: ${process.env.FRONTEND_ORIGIN}`);
    console.log(`FRONTEND_ORIGIN: ${FRONTEND_ORIGIN}`);
});