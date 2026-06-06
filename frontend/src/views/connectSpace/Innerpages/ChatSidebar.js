import React, { useState, useEffect } from "react";
import moment from "moment";
import { FaUsers, FaUser, FaSearch } from "react-icons/fa";
import "../css/connectSpace.css";
import axios from "axios";
import "../../../css/styles.css";
import AddBtn from "src/views/buttons/buttons/AddBtn";
// import avatar from "./../../../assets/images/avatars/8.jpg";
import { CAvatar } from "@coreui/react";
import { CCardBody } from "@coreui/react";
import { SearchBtn } from "src/views/buttons/buttons/SearchBtn";
import { useSelector, useDispatch } from "react-redux";
import API_BASE_URL from "src/config/config";

const ChatSidebar = ({
  users,
  groups,
  onSelect,
  onAddBtnClick,
  unreadCounts,
}) => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const checkUsername = localStorage.getItem("username");
  const orgname = localStorage.getItem("orgname");
  const orgcode = localStorage.getItem("orgcode");
  const [latestMessages, setLatestMessages] = useState([]);
  const [latestGroupMessages, setLatestGroupMessages] = useState([]);
  const refreshLatestmessage = useSelector(
    (state) => state.latestMessageVisible
  );
  const avatar = `${API_BASE_URL}/getKYCImage?username=admin&orgname=${orgname}&orgcode=${orgcode}&type=profile`;

  // Function to format count
  const formatCount = (count) => {
    if (!count) return null;
    return count > 5 ? "5+" : count;
  };

  // Filter function based on search term
  const filterItems = (items, searchTerm) => {
    if (!searchTerm) return items;
    return items.filter((item) =>
      (item.fullname || item.name)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  };

  useEffect(() => {
    const fetchLatestMessages = async () => {
      if (!orgname || !orgcode) {
        console.log("Missing orgname or orgcode for fetching messages");
        return;
      }

      console.log("Fetching latest messages for:", { orgname, orgcode });

      try {
        const response = await axios.get(
          `${API_BASE_URL}/latest-messages/${orgname}/${orgcode}`
        );

        console.log("Latest messages fetched:", response.data);

        // Filter and validate messages before setting state
        const validMessages = Array.isArray(response.data)
          ? response.data.filter(
            (msg) => msg && typeof msg === "object" && msg.id
          )
          : [];

        setLatestMessages(validMessages);
      } catch (error) {
        console.error("Error fetching latest messages:", {
          error: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });

        setLatestMessages([]); // Reset to empty array on error
      } finally {
        // Add any cleanup or state reset logic here if needed
      }
    };

    const fetchLatestGroupMessages = async () => {
      if (!orgname || !orgcode) {
        console.log("Missing orgname or orgcode for fetching messages");
        return;
      }

      console.log("Fetching latest messages for:", { orgname, orgcode });

      try {
        const response = await axios.get(
          `${API_BASE_URL}/latest-group-messages/${orgname}/${orgcode}`
        );

        console.log("Latest group messages fetched:", response.data);

        // Filter and validate messages before setting state
        const validMessages = Array.isArray(response.data)
          ? response.data.filter(
            (msg) => msg && typeof msg === "object" && msg.id
          )
          : [];

        setLatestGroupMessages(validMessages);
      } catch (error) {
        console.error("Error fetching latest messages:", {
          error: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });

        setLatestGroupMessages([]); // Reset to empty array on error
      } finally {
        // Add any cleanup or state reset logic here if needed
      }
    };

    fetchLatestMessages();
    fetchLatestGroupMessages();
  }, [orgname, orgcode, refreshLatestmessage]);
  // Get filtered data based on active tab and search
  const getFilteredData = () => {
    if (activeTab === "Groups") {
      return {
        users: [],
        groups: filterItems(groups, searchTerm),
      };
    } else {
      return {
        users: filterItems(users, searchTerm),
        groups: filterItems(groups, searchTerm),
      };
    }
  };

  const { users: filteredUsers, groups: filteredGroups } = getFilteredData();

  return (
    <div className="chat-sidebar">
      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === "All" ? "active" : ""}`}
          onClick={() => setActiveTab("All")}
        >
          All
        </button>
        <button
          className={`tab-button ${activeTab === "Groups" ? "active" : ""}`}
          onClick={() => setActiveTab("Groups")}
        >
          Groups
        </button>
      </div>
      <div className="container-div">
        <div
          className="search-box"
          style={{
            borderColor: "rgba(162, 168, 201, 0.77)",
            color: "rgba(162, 168, 201, 0.77)",
            margin: "14px 0px",
          }}
        >
          <CCardBody>
            <input
              type="text"
              placeholder="Search"
              className="text-field-connectspace"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            //   onKeyDown={handleKeyPress}
            />
          </CCardBody>
          <div style={{ marginRight: "28px", marginBottom: "4px" }}>
            <SearchBtn color={"white"} />
          </div>
        </div>
      </div>
      {/* Chat Items */}
      <div className="chat-items-container">
        {/* Users Section - only show if activeTab is 'All' */}
        {activeTab === "All" && (
          <div className="chat-section">
            {filteredUsers.map((user) => {
              const count = unreadCounts[user.id];
              const orgname = localStorage.getItem("orgname");
              const orgcode = localStorage.getItem("orgcode");
              const profilePhotoUrl = `${API_BASE_URL}/getKYCImage?username=${user.username}&orgname=${orgname}&orgcode=${orgcode}&type=profile`;
              const latestMsg = latestMessages.find(
                (item) =>
                  (item.sender_username === checkUsername && item.receiver_id === user.id) ||
                  (item.receiver_username === checkUsername && item.sender_id === user.id)
              );

              return (
                <div
                  key={user.id}
                  className="chat-item"
                  onClick={() => onSelect(user, "user")}
                >
                  <div className="chat-item-avatar">
                    <CAvatar
                      src={profilePhotoUrl ? profilePhotoUrl : avatar}
                      size="md"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = profilePhotoUrl ? profilePhotoUrl : avatar;
                      }}
                    />
                  </div>
                  <div className="chat-item-info">
                    <span className="chat-item-name">{user.fullname}</span>
                    <span className="chat-item-message">
                      {latestMsg
                        ? latestMsg.deleted_at === null
                          ? latestMsg.content
                          : "Message Deleted"
                        : ""}
                    </span>
                  </div>
                  <div className="chat-item-meta">
                    <span className="chat-item-time">
                      {latestMsg
                        ? moment(latestMsg.created_at).format("hh:mm a")
                        : ""}
                    </span>
                    {count > 0 && (
                      <span className="unread-badge">{formatCount(count)}{count}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Groups Section */}
        <div className="chat-section">
          {filteredGroups.map((group) => {
            const count = unreadCounts[group.id];

            const latestGroupMsg = latestGroupMessages.find(
              (item) => item.group_id === group.id
            );

            const messageSender =
              latestGroupMsg?.sender_username === checkUsername
                ? "You"
                : latestGroupMsg?.sender_name;

            const messageText = latestGroupMsg?.content || "";
            const messageTime = latestGroupMsg
              ? moment(latestGroupMsg.created_at).format("hh:mm a")
              : "";

            return (
              <div
                key={group.id}
                className="chat-item"
                onClick={() => onSelect(group, "group")}
              >
                <div className="chat-item-avatar">
                  <CAvatar
                    src={avatar}
                    size="md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = avatar;
                    }}
                  />
                </div>
                <div className="chat-item-info">
                  <span className="chat-item-name">{group.name}</span>
                  <span className="chat-item-message">
                    {latestGroupMsg ? `${messageSender}: ${messageText}` : ""}
                  </span>
                </div>
                <div className="chat-item-meta">
                  <span className="chat-item-time">{messageTime}</span>
                  {count > 0 && (
                    <span className="unread-badge">{formatCount(count)}</span>
                  )}
                </div>
              </div>
            );
          })}

        </div>
      </div>
      {/* Add Button - positioned at bottom */}
      {activeTab === "Groups" && (
        <div className="add-button-container" onClick={onAddBtnClick}>
          <AddBtn addBtn={" Group"} />
        </div>
      )}
    </div>
  );
};

export default ChatSidebar;
