import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RefreshBtn from "../buttons/buttons/RefreshBtn";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CPopover,
  CRow,
  CCardBody,
  CCard,
} from "@coreui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../css/styles.css";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { NewUser } from "../../views/new_user/NewUser";
import toast from "react-hot-toast";
import DeleteBtn from "../buttons/buttons/DeleteBtn";
import "./css/userlist.css";
import AddBtn from "../buttons/buttons/AddBtn";
import InputPopup from "src/components/inputPopup/InputPopup";
import styles from "../user_report/css/userreport.module.css";
import API_BASE_URL from "src/config/config";

const UserList = () => {
  const [allData, setAllData] = useState([]);
  const navigate = useNavigate();
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [userToDelete, setuserToDelete] = useState("");
  const [indexOfUser, setIndexOfUser] = useState();
  const [remark, setRemark] = useState("");
  const [userAccessData, setuserAccessData] = useState([]);
  const location = useLocation();
  const [activeTab, setactiveTab] = useState("All");
  const [category, setCategory] = useState("");
  const [departmentList, setDepartmentList] = useState([]);

  if (location.pathname === "/userlist") {
    localStorage.removeItem("empnameforaccess");
    localStorage.removeItem("accessedRows");
  }
  const contactFields2 = [
    {
      id: "remark",
      label: "Reason",
      placeholder: "Entering Remark is Required",
      inputType: "text",
    },
  ];
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  useEffect(() => {
    const handleStorageChange = () => {
      const newTheme = localStorage.getItem("theme") || "light";
      setTheme(newTheme);
    };

    window.addEventListener("storage", handleStorageChange);

    // Also listen to changes within the same tab
    const observer = new MutationObserver(handleStorageChange);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Ensure theme updates when switching
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const fetchAllUsernames = async () => {
    try {
      const codeoforg = localStorage.getItem("orgcode");
      const nameoforg = localStorage.getItem("orgname");
      const username = localStorage.getItem("empnameforaccess");
      const response = await axios.get(
        `${API_BASE_URL}/getUseraccessforuser`,
        {
          params: {
            orgcode: codeoforg,
            orgname: nameoforg,
            username: username,
          },
        }
      );
      setAllData(response.data.rows);
      setuserAccessData(response.data.row);
    } catch (error) {
      console.log("Error: " + error);
    }
  };
  useEffect(() => {
    fetchAllUsernames();
  }, []);

  const getDepartment = async () => {
    try {
      const orgcode = localStorage.getItem("orgcode");
      const orgname = localStorage.getItem("orgname");

      const response = await axios.get(`${API_BASE_URL}/getDepartment`, {
        params: {
          orgcode,
          orgname,
        },
      });

      if (response.status === 200) {
        console.log("Raw data:", response.data.data);
        const departments = response.data.data[0]; // because of nested array
        const names = departments.map((item) => item.departmentname);
        setDepartmentList(names);
        console.log("Department list:", names);
      }
    } catch (error) {
      toast.error("Failed to get department");
      console.error("Failed to get department:", error);
    }
  };

  useEffect(() => {
    getDepartment();
  }, []);

  const handleAddCategory = () => {
    toast.success("Category Added");
  };
  const handleAccess = async (index) => {
    // Access the username at the specified index in the allData state

    const codeoforg = localStorage.getItem("orgcode");
    const nameoforg = localStorage.getItem("orgname");
    const username = allData[index].username;
    const response = await axios.get(
      `${API_BASE_URL}/getUseraccessforuser`,
      {
        params: {
          orgcode: codeoforg,
          orgname: nameoforg,
          username: username,
        },
      }
    );
    localStorage.setItem("accessedRows", JSON.stringify(response.data));
    // Store the username in localStorage
    localStorage.setItem("fullnameforaccess", allData[index].fullname);
    const encodedUsername = encodeURIComponent(username);
    window.open(`/#/UserListAccess/${encodedUsername}`, "_blank");
  };

  const handleDelete = async (index) => {
    const usernameToDelete = allData[indexOfUser].username;
    try {
      // Call the delete API to remove the user from the backend
      await axios.post(`${API_BASE_URL}/emp/delete`, {
        username: usernameToDelete,
        orgcode: localStorage.getItem("orgcode"),
        orgname: localStorage.getItem("orgname"),
        remark: remark.remark,
        deletedby: localStorage.getItem("username"),
      });

      // Save the frontend state after successful deletion
      fetchAllUsernames();
      setAllData((prevData) => prevData.filter((_, i) => i !== index));
      // console.log(`User ${usernameToDelete} deleted successfully.`);
      toast.success(`User ${usernameToDelete} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  const refreshData = () => {
    fetchAllUsernames();
    toast.success("Data Refreshed");
  };

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.setItem("onCreate", true);
    localStorage.setItem("uniquevalue", "JobsButton");
    // navigate("/new_user"); // Redirect to new_user
  };

  const handleRowDoubleClick = (index) => {
    handleAccess(index);
  };

  const [regForm, setregForm] = useState({
    username: "",
    password: "",
    orgcode: localStorage.getItem("orgcode"),
    repeatPassword: "",
    fullname: "",
  });
  const [currentPopup, setCurrentPopup] = useState("none");
  const [isEditing, setIsEditing] = useState(false);

  const [selectedRole, setselectedRole] = useState("");

  function handleChange(e) {
    setregForm({
      ...regForm,
      [e.target.name]: e.target.value,
    });
  }

  const contactFields = [
    { id: "Category", label: "Category Name", inputType: "text" },
  ];

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("userauthtoken");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
  }, [navigate]);

  async function handleSubmit(e) {
    // e.preventDefault();
    try {
      const nameoforg = localStorage.getItem("orgname");
      if (regForm.username.includes(" ")) {
        alert("No spacing in username");
        return;
      }
      const response = await axios.post(`${API_BASE_URL}/emp/store`, {
        username: regForm.username,
        password: regForm.password,
        orgname: nameoforg,
        // orgcode: regForm.orgcode,
        orgcode: localStorage.getItem("orgcode"),
        repeatPassword: regForm.repeatPassword,
        fullname: regForm.fullname,
        role: selectedRole,
        createdby: localStorage.getItem("username"),
      });

      setregForm({
        username: "",
        password: "",
        orgcode: "",
        repeatPassword: "",
        fullname: "",
      });

      if (response.statusCode === 200) {
        setselectedRole("");
        toast.success("New user added successfully");
      }

      //  navigate("/userlist");
      window.location.reload(); // Reload the page
    } catch (error) {
      toast.error("Error creating new user");
      console.log("Error: " + error);
    }
  }

  const [storedRoles, setStoredRoles] = useState([]);
  const GetallRoles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getuserroles`, {
        params: {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
        },
      });
      setStoredRoles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetallRoles();
  }, []);
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div>
        <CCardBody>
          <div className={styles.firstRow}>
            <button
              className="invisible-btn-style"
              style={{ position: "absolute", left: "20px", top: "2px" }}
              onClick={() => {
                refreshData();
              }}
            >
              <RefreshBtn />
            </button>
            <div className={styles.importBox}>
              <div className={styles.Title}>User List</div>
            </div>
          </div>

          <table
            className="min-w-full border-separate"
            style={{
              width: "100%",
              borderCollapse: "separate", // ✅ Ensure separate borders
              borderSpacing: "0 8px", // ✅ Adds spacing between rows
              marginTop: "10px",
            }}
          >
            <thead className={styles.tableHead}>
              <tr>
                <th
                  className="px-4 py-2 text-left"
                  style={{ fontWeight: "500", textAlign: "center" }}
                >
                  Username
                </th>
                <th
                  className="px-4 py-2 text-left"
                  style={{ fontWeight: "500", textAlign: "center" }}
                >
                  Access
                </th>
                <th
                  className="px-4 py-2 text-left"
                  style={{ fontWeight: "500", textAlign: "center" }}
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {allData.map((userData, index) => {
                const isSelected = selectedRowIndex === index;

                return (
                  <tr
                    onClick={() => setSelectedRowIndex(index)}
                    onDoubleClick={() => handleRowDoubleClick(index)}
                    key={index}
                    className={` rounded-lg shadow-md`}
                    style={{
                      backgroundColor:
                        theme === "dark"
                          ? index % 2 === 0
                            ? "#3B5472" // Dark mode even row
                            : "#263A52" // Dark mode odd row
                          : index % 2 === 0
                          ? "#D8F0FD" // Light mode even row
                          : "#F6FCFF", // Light mode odd row
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    <td
                      className={`${styles.tableData}`}
                      style={{ textAlign: "center" }}
                    >
                      {userData.username}
                    </td>
                    <td
                      className={`${styles.tableData}`}
                      style={{ textAlign: "center" }}
                    >
                      {userAccessData.some(
                        (accessUser) =>
                          accessUser.username === userData.username
                      )
                        ? "Import"
                        : "Access"}
                    </td>
                    <td
                      className={`${styles.tableData}`}
                      style={{ textAlign: "center" }}
                    >
                      <td
                        className={`${styles.tableData} px-4 py-2`}
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div
                          onClick={() => {
                            setRemark("");
                            setCurrentPopup("Deletion");
                            setIndexOfUser(index);
                            setuserToDelete(userData.username);
                          }}
                        >
                          <DeleteBtn
                            fill={
                              theme === "dark" ? "#f8d7da" : "var(--page-title)"
                            }
                          />
                        </div>
                      </td>

                      {/* </CPopover> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="search-button">
            <svg
              onClick={() => {
                window.open("#/NewKYCAccess", "_blank");
              }}
              type="submit"
              width="40px"
              height="40px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z"
                fill={theme === "dark" ? "#fff" : "#2F4096"}
              />
            </svg>
          </div>
        </CCardBody>
      </div>
      {console.log("value before popup", regForm)}

      {currentPopup === "Deletion" && (
        <InputPopup
          title={userToDelete}
          setCurrentPopup={setCurrentPopup}
          fields={contactFields2}
          value={remark}
          setValue={setRemark}
          handleAdd={handleDelete}
          firstButtonText={"Delete"}
          secondButtonText={"Close"}
          width={"450px"}
          selection={"none"}
          top={"50%"}
          left={"50%"}
        />
      )}

      {currentPopup === "addCategory" && (
        <InputPopup
          title={`Add Category`}
          setCurrentPopup={setCurrentPopup}
          fields={contactFields}
          value={category}
          setValue={setCategory}
          handleAdd={handleAddCategory}
          firstButtonText={"Add"}
          secondButtonText={"Close"}
          selection={"none"}
          left={"60%"}
          top={"50%"}
          width={"330px"}
        />
      )}
    </div>
  );
};

export default UserList;
