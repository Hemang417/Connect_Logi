import React, { useEffect, useState, useRef } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import axios from 'axios';
import "../css/connectSpace.css";
import { CAvatar } from '@coreui/react';
import { socketManager } from '../../../utils/socket';
import ConnectSpaceIcon from 'src/views/icons/connectspace/ConnectSpaceIcon';
import API_BASE_URL from "src/config/config";

const ChatWindow = ({ selectedUser, currentUser, isGroup, updateUnreadCount }) => {
    const [messages, setMessages] = useState([]);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const orgname = localStorage.getItem("orgname");
    const orgcode = localStorage.getItem("orgcode");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const avatar = `${API_BASE_URL}/getKYCImage?username=admin&orgname=${orgname}&orgcode=${orgcode}&type=profile`;

    // Helper function to get date label
    const getDateLabel = (date) => {
        const messageDate = new Date(date);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        // Reset time to compare only dates
        const messageDateOnly = new Date(messageDate.getFullYear(), messageDate.getMonth(), messageDate.getDate());
        const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const yesterdayOnly = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());

        if (messageDateOnly.getTime() === todayOnly.getTime()) {
            return "Today";
        } else if (messageDateOnly.getTime() === yesterdayOnly.getTime()) {
            return "Yesterday";
        } else {
            // For other dates, show in format like "July 9, 2025"
            return messageDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    };

    // Function to check if we need to show date separator
    const shouldShowDateSeparator = (currentMessage, previousMessage) => {
        if (!previousMessage) return true; // First message always shows date

        const currentDate = new Date(currentMessage.created_at);
        const previousDate = new Date(previousMessage.created_at);

        // Check if messages are from different days
        return currentDate.toDateString() !== previousDate.toDateString();
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleEditMessage = async (messageId, newContent) => {
        try {
            const response = await axios.patch(
                `${API_BASE_URL}/messages/${messageId}`,
                { content: newContent }
            );

            if (response.data) {
                setMessages(prev =>
                    prev.map(msg => msg.id === messageId ? response.data : msg)
                );

                // Broadcast via socket
                const roomId = isGroup ? `group_${selectedUser.id}` :
                    [currentUser.id, selectedUser.id].sort().join('_');

                const socket = socketManager.getSocket();
                if (socket && socket.connected) {
                    socket.emit('updateMessage', {
                        roomId,
                        message: response.data
                    });
                }
            }
        } catch (error) {
            console.error('Error editing message:', error);
            alert('Failed to edit message. Please try again.');
        }
    };

    const handleDeleteMessage = async (messageId) => {
        try {
            await axios.delete(`${API_BASE_URL}/messages/${messageId}`);

            setMessages(prev =>
                prev.map(msg => msg.id === messageId ?
                    { ...msg, deleted_at: new Date().toISOString() } : msg)
            );

            // Broadcast via socket
            const roomId = isGroup ? `group_${selectedUser.id}` :
                [currentUser.id, selectedUser.id].sort().join('_');

            const socket = socketManager.getSocket();
            if (socket && socket.connected) {
                socket.emit('deleteMessage', {
                    roomId,
                    messageId
                });
            }
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    // Add to useEffect handling socket messages
    useEffect(() => {
        if (selectedUser && currentUser) {
            updateUnreadCount(selectedUser.id, false);
            fetchMessages();
        }
    }, [selectedUser, currentUser, isGroup]);

    const fetchProfilePhoto = async () => {
        try {
            const username = selectedUser?.username;
            const orgname = localStorage.getItem("orgname");
            const orgcode = localStorage.getItem("orgcode");

            if (!username || !orgname || !orgcode) {
                setProfilePhoto(null);
                return;
            }

            const profilePhotoUrl = `${API_BASE_URL}/getKYCImage?username=${username}&orgname=${orgname}&orgcode=${orgcode}&type=profile`;
            setProfilePhoto(profilePhotoUrl);
        } catch (err) {
            console.error("Failed to fetch profile photo:", err);
            setProfilePhoto(null);
        }
    };

    useEffect(() => {
        if (selectedUser && currentUser) {
            fetchMessages();
        }
        if (selectedUser && selectedUser.username) {
            fetchProfilePhoto();
        }
    }, [selectedUser, isGroup]);

    const fetchMessages = async () => {
        if (!selectedUser || !currentUser) {
            console.log("Missing selectedUser or currentUser for fetching messages");
            return;
        }

        console.log("Fetching messages for:", { selectedUser, currentUser, isGroup });
        setLoading(true);

        try {
            let response;
            if (isGroup) {
                response = await axios.get(`${API_BASE_URL}/groupmessages/${orgname}/${orgcode}/${selectedUser.id}`);
            } else {
                response = await axios.get(
                    `${API_BASE_URL}/messages/${orgname}/${orgcode}/${currentUser.id}/${selectedUser.id}`
                );
            }
            console.log("Messages fetched:", response.data);
            const validMessages = Array.isArray(response.data)
                ? response.data.filter(msg => msg && typeof msg === 'object' && msg.id)
                : [];
            
            // Sort messages by created_at to ensure proper chronological order
            const sortedMessages = validMessages.sort((a, b) => 
                new Date(a.created_at) - new Date(b.created_at)
            );
            
            setMessages(sortedMessages);
        } catch (error) {
            console.error('Error fetching messages:', error);
            setMessages([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!currentUser || !selectedUser) return;

        // Import socket from the shared socket module
        const socket = socketManager.getSocket();

        const username = localStorage.getItem("username");

        // Check if socket is connected before emitting
        if (socket && socket.connected) {
            socket.emit("register", username);

            if (isGroup) {
                socket.emit("joinGroup", selectedUser.id);
            } else {
                const roomId = [currentUser.id, selectedUser.id].sort().join("_");
                socket.emit("joinRoom", roomId);
            }
        } else {
            // Try to connect and then emit
            socket.connect();
            socket.on('connect', () => {
                socket.emit("register", username);

                if (isGroup) {
                    socket.emit("joinGroup", selectedUser.id);
                } else {
                    const roomId = [currentUser.id, selectedUser.id].sort().join("_");
                    socket.emit("joinRoom", roomId);
                }
            });
        }

        const handleReceiveMessage = (msg) => {
            if (msg && typeof msg === 'object' && msg.id) {
                // Check if message is for current conversation
                if (!selectedUser ||
                    (isGroup && selectedUser.id !== msg.conversation_id) ||
                    (!isGroup && selectedUser.id !== msg.sender_id && selectedUser.id !== msg.receiver_id)) {
                    updateUnreadCount(msg.conversation_id);
                }

                setMessages((prevMessages) => {
                    // Add new message and sort by created_at
                    const updatedMessages = [...prevMessages, msg];
                    return updatedMessages.sort((a, b) => 
                        new Date(a.created_at) - new Date(b.created_at)
                    );
                });
            }
        };

        socket.on("receiveMessage", handleReceiveMessage);

        socket.on("messageUpdated", (updatedMessage) => {
            setMessages(prev => {
                const updated = prev.map(msg => msg.id === updatedMessage.id ? updatedMessage : msg);
                return updated.sort((a, b) => 
                    new Date(a.created_at) - new Date(b.created_at)
                );
            });
        });

        socket.on("messageDeleted", (messageId) => {
            setMessages(prev =>
                prev.map(msg => msg.id === messageId ?
                    { ...msg, deleted_at: new Date().toISOString() } : msg)
            );
        });

        return () => {
            socket.off("receiveMessage", handleReceiveMessage);
            // Don't disconnect here - let the socket module manage connection lifecycle
        };
    }, [selectedUser, currentUser, isGroup]);

    const handleSendMessage = (message) => {
        console.log("Message sent:", message);
        // Do not update state here; wait for socket to receive it
    };

    // Show placeholder when no user is selected
    if (!selectedUser) {
        return (
            <div className="chat-window empty-chat" style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                textAlign: 'center',
                padding: '2rem'
            }}>
                <ConnectSpaceIcon color="var(--message-mine)" size="300px" />
                <div style={{ marginLeft: '-4px', marginTop: '1rem', fontSize: '1.2rem', color: 'var(--no-chat)' }}>
                    Select a user to start chatting
                </div>
            </div>
        );
    }

    // Show loading state
    if (loading) {
        return (
            <div className="chat-window">
                <div className="chat-header" style={{ display: 'flex', alignItems: 'center' }}>
                    <CAvatar
                        src={isGroup ? avatar : profilePhoto}
                        size="md"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = isGroup ? avatar : profilePhoto;
                        }}
                        style={{ marginRight: '10px' }}
                    />
                    <span>{selectedUser?.name || selectedUser?.fullname}</span>
                </div>
                <div className="chat-messages">
                    <div>Loading messages...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="chat-window">
            <div className="chat-header" style={{ display: 'flex', alignItems: 'center' }}>
                <CAvatar
                    src={isGroup ? avatar : profilePhoto}
                    size="md"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = isGroup ? avatar : profilePhoto;
                    }}
                    style={{ marginRight: '10px' }}
                />
                <span>{selectedUser?.name || selectedUser?.fullname || 'Unknown User'}</span>
            </div>

            <div className="chat-messages">
                {messages.length > 0 ? (
                    messages.map((msg, index) => {
                        const previousMessage = index > 0 ? messages[index - 1] : null;
                        const showDateSeparator = shouldShowDateSeparator(msg, previousMessage);
                        const dateLabel = showDateSeparator ? getDateLabel(msg.created_at) : null;

                        return (
                            <Message
                                key={`${msg.id}-${index}`}
                                message={msg}
                                currentUser={currentUser}
                                isGroup={isGroup}
                                onEdit={handleEditMessage}
                                onDelete={handleDeleteMessage}
                                showDateSeparator={showDateSeparator}
                                dateLabel={dateLabel}
                            />
                        );
                    })
                ) : (
                    <div className="no-messages">No messages yet. Start the conversation!</div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Always show MessageInput when user is selected and currentUser exists */}
            {currentUser && (
                <MessageInput
                    onSend={handleSendMessage}
                    senderId={currentUser.id}
                    receiverId={selectedUser.id}
                    isGroup={isGroup}
                />
            )}
        </div>
    );
};

export default ChatWindow;