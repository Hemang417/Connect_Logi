import React, { useState } from "react";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";
import "../css/connectSpace.css";
import { socketManager } from "../../../utils/socket";
import API_BASE_URL from "src/config/config";

const MessageInput = ({ onSend, senderId, receiverId, isGroup }) => {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!text.trim() || sending) return;

    setSending(true);

    const payload = {
      orgname: localStorage.getItem("orgname"),
      orgcode: localStorage.getItem("orgcode"),
      content: text.trim(),
    };

    if (receiverId) {
      if (isGroup) {
        payload.group_id = receiverId;
      } else {
        payload.receiver_id = receiverId;
      }
    }

    if (senderId) {
      payload.sender_id = senderId;
    }

    try {
      const endpoint = isGroup ? "sendgroupmessage" : "sendmessage";
      const response = await axios.post(
        `${API_BASE_URL}/${endpoint}`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Message sent response data:", response.data);
      onSend(response.data);

      // Emit via socket
      const roomId = isGroup
        ? `group_${receiverId}`
        : [senderId, receiverId].sort().join("_");

      const socket = socketManager.getSocket();
      if (socket && socket.connected) {
        socket.emit("chatMessage", {
          roomId,
          message: response.data,
        });
      } else {
        console.warn("Socket not connected, message not sent via socket");
      }

      setText("");
    } catch (error) {
      const message = error.response?.data?.error || "Unknown error occurred";
      alert(`Message send failed: ${message}`);
      console.error("Error sending message:", message, error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={`Type a message${isGroup ? " to group" : ""}...`}
        disabled={sending}
        style={{
          flex: 1,
          padding: "14px",
          border: "1px solid #ccc",
          borderRadius: "34px",
          paddingRight: "50px",
        }}
      />
      <div
        onClick={handleSend}
        disabled={!text.trim() || sending}
        style={{   cursor: sending ? "not-allowed" : "pointer",position: "absolute", right: "30px" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M22.5 11.9897C22.5007 12.2569 22.43 12.5195 22.2951 12.7502C22.1603 12.981 21.9663 13.1715 21.7331 13.3022L5.99062 22.3031C5.76472 22.4311 5.50967 22.4989 5.25 22.5C5.01074 22.4987 4.77526 22.4402 4.56322 22.3293C4.35117 22.2185 4.16872 22.0586 4.03109 21.8628C3.89345 21.6671 3.80463 21.4413 3.77205 21.2043C3.73946 20.9673 3.76404 20.7259 3.84375 20.5003L6.375 13.005C6.39974 12.9317 6.44653 12.8679 6.50896 12.8222C6.5714 12.7766 6.64642 12.7513 6.72375 12.75H13.5C13.6028 12.7502 13.7046 12.7293 13.799 12.6885C13.8934 12.6478 13.9784 12.588 14.0487 12.513C14.119 12.438 14.1732 12.3494 14.2078 12.2526C14.2425 12.1558 14.2568 12.0529 14.25 11.9503C14.233 11.7574 14.1438 11.5781 14.0002 11.4482C13.8566 11.3184 13.6692 11.2476 13.4756 11.25H6.72562C6.64717 11.25 6.57069 11.2254 6.50695 11.1796C6.44321 11.1339 6.39542 11.0693 6.37031 10.995L3.83906 3.5006C3.73831 3.21334 3.72735 2.90223 3.80762 2.60859C3.8879 2.31495 4.05562 2.05269 4.28849 1.85664C4.52137 1.66059 4.80839 1.54004 5.11141 1.51099C5.41443 1.48195 5.71912 1.54579 5.985 1.69403L21.735 10.6837C21.9668 10.814 22.1599 11.0036 22.2943 11.2331C22.4287 11.4626 22.4997 11.7237 22.5 11.9897Z"
            fill="#919191"
          />
        </svg>
      </div>
    </div>
  );
};

export default MessageInput;
