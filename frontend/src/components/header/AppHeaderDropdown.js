import React, { useEffect, useState } from "react";
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import axios from "axios";
import "../../css/styles.css";
import "../../css/allVars.css";
import avatar8 from "./../../assets/images/avatars/8.jpg";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "src/config/config";
const AppHeaderDropdown = () => {

  const [allBranches, setallBranches] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const checkUsername = (localStorage.getItem("username"));
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const fetchProfilePhoto = async () => {
    try {
      const username = localStorage.getItem("username");
      const orgname = localStorage.getItem("orgname");
      const orgcode = localStorage.getItem("orgcode");

      const profilePhotoUrl = `${API_BASE_URL}/getKYCImage?username=${username}&orgname=${orgname}&orgcode=${orgcode}&type=profile`;
      setProfilePhoto(profilePhotoUrl);
    } catch (err) {
      console.error("Failed to fetch profile photo:", err);
      setProfilePhoto(null);
    }
  };

  useEffect(() => {
    fetchProfilePhoto();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Add event listener for key press
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Normalize key to uppercase to avoid case sensitivity issues
      if (event.ctrlKey && event.key.toUpperCase() === "D") {
        event.preventDefault(); // Prevent any unwanted default behavior
        toggleDarkMode();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);



  const FetchAllBranches = async (branch) => {
    try {
      const branches = await axios.get(`${API_BASE_URL}/getAllBranches`, {
        params: {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          username: localStorage.getItem("username"),
        },
      });
      setallBranches(branches.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchAllBranches();
  }, []);

  const handleBranchSelection = (branch) => {
    alert(`Are you sure you want to switch to ${branch.ownbranchname}?`);
    // Save localStorage with the selected branch's details
    localStorage.setItem("branchnameofemp", branch.ownbranchname);
    localStorage.setItem("branchcodeofemp", branch.branchcode);
    // location.reload();
    FetchAllBranches();
    location.reload(navigate('/dashboard'))
    // navigate('/dashboard')
    // toast.success(`Branch Changed`)
  };

  const handleLogout = () => {
    Cookies.remove("userauthtoken");
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar
          src={checkUsername === "admin" ? avatar8 : profilePhoto}
          size="md"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = avatar8;
          }}
        />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Branches
        </CDropdownHeader>

        {allBranches &&
          allBranches.map((item, index) => {
            // Check if the current item's ownbranchname matches the branchname stored in localStorage
            const isSelectedBranch =
              localStorage.getItem("branchnameofemp") === item.ownbranchname;

            // Define a CSS class based on the condition
            const className = isSelectedBranch
              ? "selected-branch"
              : "allbranches";

            return (
              <CDropdownItem
                key={index}
                className={className}
                onClick={() => handleBranchSelection(item)}
              >
                {item.ownbranchname}
              </CDropdownItem>
            );
          })}

        <CDropdownHeader className="bg-light fw-semibold py-2">
          Account
        </CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilBell} className="me-2" />
          Updates
          <CBadge color="info" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Messages
          <CBadge color="success" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Tasks
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Settings
        </CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCreditCard} className="me-2" />
          Payments
          <CBadge color="secondary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Projects
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem style={{ cursor: "pointer" }} onClick={() => setDarkMode((prev) => !prev)}>
          <CIcon icon={cilUser} className="me-2" />
          {!darkMode ? "Dark Mode" : "Light Mode"}
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem style={{ cursor: "pointer" }} onClick={handleLogout}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
