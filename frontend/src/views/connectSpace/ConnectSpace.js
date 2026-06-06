import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatSidebar from "./Innerpages/ChatSidebar";
import ChatWindow from "./Innerpages/ChatWindow";
import axios from "axios";
import "./css/connectSpace.css";
import EmployeeSelectModal from "src/components/inputPopup/EmployeeSelectModal";
import Cookies from "js-cookie";
import API_BASE_URL from "src/config/config";

const ConnectSpace = () => {
  const [users, setUsers] = useState([]);
  const [allemployees, setAllEmployees] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [unreadCounts, setUnreadCounts] = useState({});

  const updateUnreadCount = (conversationId, increment = true) => {
    setUnreadCounts((prev) => {
      const currentCount = prev[conversationId] || 0;
      return {
        ...prev,
        [conversationId]: increment ? currentCount + 1 : 0,
      };
    });
    console.log('unreadCounts:', unreadCounts);

  };

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("userauthtoken");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
  }, [navigate]);

  const fetchCurrentUser = async () => {
    console.log("=== STARTING FETCH CURRENT USER ===");
    setUserLoading(true);
    try {
      const username = localStorage.getItem("username");
      const orgname = localStorage.getItem("orgname");
      const orgcode = localStorage.getItem("orgcode");

      console.log("LocalStorage values:", { username, orgname, orgcode });

      if (!username || !orgname || !orgcode) {
        console.error("Missing localStorage values:", {
          username,
          orgname,
          orgcode,
        });
        setCurrentUser(null);
        setUserLoading(false);
        return;
      }

      const response = await axios.get(
        `${API_BASE_URL}/fetchcurrentuser`,
        {
          params: { username, orgname, orgcode },
        }
      );

      console.log("fetchCurrentUser response:", response.data);

      // The API returns an array, so take the first element
      if (
        response.data &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        const userData = response.data[0];
        console.log("Setting currentUser to:", userData);
        setCurrentUser(userData);
      } else if (
        response.data &&
        !Array.isArray(response.data) &&
        response.data.id
      ) {
        // In case API returns single object
        console.log("Setting currentUser to single object:", response.data);
        setCurrentUser(response.data);
      } else {
        console.error(
          "fetchCurrentUser: No valid user data returned",
          response.data
        );
        setCurrentUser(null);
      }
    } catch (err) {
      console.error("Failed to fetch current user:", err);
      console.error("Error details:", err.response?.data);
      setCurrentUser(null);
      setError("Failed to load user data. Please refresh the page.");
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []); // Only run once on mount

  const handleAddBtnClick = () => {
    console.log("Add button clicked");
    setShowModal(true);
  };

  const handleEmployeeSelect = (employee) => {
    console.log("Employee selected:", employee);
    setSelectedUser(employee);
    setSelectedType("user");
    setShowModal(false);
  };

  const handleCreateGroup = async (groupName, selectedEmployees) => {
    try {
      const orgname = localStorage.getItem("orgname");
      const orgcode = localStorage.getItem("orgcode");

      if (!currentUser || !currentUser.id) {
        console.error("No current user available for group creation");
        alert("Unable to create group. Please refresh and try again.");
        return;
      }

      const memberIds = selectedEmployees.map((emp) => emp.id);

      const response = await axios.post(`${API_BASE_URL}/creategroup`, {
        orgname,
        orgcode,
        name: groupName,
        created_by: currentUser.id,
        members: memberIds,
      });

      console.log("Group created:", response.data);

      // Refresh the groups list
      await fetchData();

      // Select the newly created group
      setSelectedUser(response.data);
      setSelectedType("group");

      alert("Group created successfully!");
    } catch (error) {
      console.error("Failed to create group:", error);
      alert("Failed to create group. Please try again.");
    }
  };

  const fetchData = async () => {
    console.log("=== STARTING FETCH DATA ===");
    console.log("Current user for fetchData:", currentUser);

    if (!currentUser || typeof currentUser.id !== "number") {
      console.log("No valid currentUser.id, skipping fetch");
      setLoading(false);
      return;
    }

    const orgname = localStorage.getItem("orgname");
    const orgcode = localStorage.getItem("orgcode");

    if (!orgname || !orgcode) {
      console.warn("Missing orgname or orgcode in localStorage");
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      console.log("Making API calls for user ID:", currentUser.id);
      const [usersRes, groupsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/employeechats`, {
          params: { exclude: currentUser.id, orgname, orgcode },
        }),
        axios.get(`${API_BASE_URL}/groupchats/${currentUser.id}`),
      ]);

      console.log("Users fetched:", usersRes.data);
      console.log("Groups fetched:", groupsRes.data);

      setUsers(Array.isArray(usersRes.data) ? usersRes.data : []);
      setGroups(Array.isArray(groupsRes.data) ? groupsRes.data : []);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch sidebar data:", err);
      setError("Failed to load users. Please try again later.");
      setUsers([]);
      setGroups([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("useEffect for fetchData triggered, currentUser:", currentUser);
    console.log("userLoading:", userLoading);

    // Only fetch data if we have currentUser and user loading is complete
    if (!userLoading && currentUser) {
      fetchData();
    } else if (!userLoading && !currentUser) {
      // User loading complete but no current user
      setLoading(false);
    }
  }, [currentUser, userLoading]); // Depend on both currentUser and userLoading

  const fetchAllEmployees = async () => {
    try {
      const orgname = localStorage.getItem("orgname");
      const orgcode = localStorage.getItem("orgcode");

      if (!orgname || !orgcode) {
        console.error("Missing org data for fetching employees");
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/allemployees`, {
        params: { orgname, orgcode },
      });

      const currentUsername = localStorage.getItem("username");
      const filteredEmployees = response.data.filter(
        (emp) => emp.username !== currentUsername
      );
      setAllEmployees(filteredEmployees);
      console.log("Fetched allemployees:", response.data);
    } catch (error) {
      console.error("Failed to fetch all employees:", error);
      setAllEmployees([]);
    }
  };

  useEffect(() => {
    fetchAllEmployees();
  }, []); // Only fetch all employees once on component mount

  const handleSelect = (userOrGroup, type) => {
    console.log("handleSelect called:", { userOrGroup, type });
    setSelectedUser(userOrGroup);
    setSelectedType(type);
  };

  console.log("ConnectSpace render - currentUser:", currentUser);
  console.log(
    "ConnectSpace render - users:",
    users.length,
    "groups:",
    groups.length
  );
  console.log(
    "ConnectSpace render - userLoading:",
    userLoading,
    "loading:",
    loading
  );

  // Show loading state while fetching current user
  if (userLoading) {
    return (
      <div className="chat-container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "400px",
          }}
        >
          <div>Loading user data...</div>
        </div>
      </div>
    );
  }

  // Show error state if current user couldn't be loaded
  if (!currentUser) {
    return (
      <div className="chat-container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "400px",
            flexDirection: "column",
          }}
        >
          <div>Failed to load user data</div>
          <button
            className="CSButton"
            onClick={fetchCurrentUser}
            style={{ marginTop: "10px" }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      {showModal && (
        <EmployeeSelectModal
          employees={allemployees}
          onSelect={handleEmployeeSelect}
          onClose={() => setShowModal(false)}
          onCreateGroup={handleCreateGroup}
        />
      )}
      <ChatSidebar
        users={users}
        groups={groups}
        onSelect={handleSelect}
        currentUserId={currentUser?.id}
        onAddBtnClick={handleAddBtnClick}
        unreadCounts={unreadCounts}
        isGroup={selectedType === "group"}
      />
      <ChatWindow
        selectedUser={selectedUser}
        currentUser={currentUser}
        isGroup={selectedType === "group"}
        updateUnreadCount={updateUnreadCount}
      />
    </div>
  );
};

export default ConnectSpace;
