import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RefreshBtn from "../buttons/buttons/RefreshBtn";
import toast from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import styles from "./css/userreport.module.css";
import { SearchBtn } from "../buttons/buttons/SearchBtn";
import NewButton from "../buttons/buttons/NewButton";
import ArrowCircleLeft from "../buttons/buttons/ArrowCircleLeft";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";
import InputPopup from "src/components/inputPopup/InputPopup";
import DeleteBtn from "../buttons/buttons/DeleteBtn";
import API_BASE_URL from "src/config/config";

const User_Report = () => {
  const [employees, setEmployees] = useState([]);
  const [branchAccess, setBranchAccess] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [userBranchMap, setUserBranchMap] = useState({});
  const [selectedBranch, setSelectedBranch] = useState("");
  const [uniqueBranches, setUniqueBranches] = useState([]);
  const [searchedValue, setSearchedValue] = useState("");
  const contactFields = [
    { id: "Department", label: "Department Name", inputType: "text" },
  ];
  const [currentPopup, setCurrentPopup] = useState("none");
  const [activeTab, setactiveTab] = useState("All");
  const [category, setCategory] = useState("");
  const [userToDelete, setuserToDelete] = useState("");
  const [indexOfUser, setIndexOfUser] = useState();
  const [remark, setRemark] = useState("");
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
    const checkToken = async () => {
      const token = Cookies.get("userauthtoken");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
  }, [navigate]);

  if (location.pathname === "/user_report") {
    localStorage.removeItem("empnameforaccess");
    localStorage.removeItem("branchnames");
    localStorage.removeItem("fullname");
  }

  const branchesOptions = [
    { label: "All Branches", value: "" }, // Add first option
    ...uniqueBranches.map((branch) => ({
      value: branch.clientname,
      label: branch.clientname,
    })),
  ];

  const refreshData = () => {
    fetchAllUsernames();
    getDepartment();

    toast.success("Data Refreshed");
  };

  const fetchAllUsernames = async () => {
    try {
      const codeoforg = localStorage.getItem("orgcode");
      const nameoforg = localStorage.getItem("orgname");
      const response = await axios.get(`${API_BASE_URL}/fetchAllusers`, {
        params: {
          orgcode: codeoforg,
          orgname: nameoforg,
        },
      });

      // Handle the updated response structure
      if (response.data) {
        setEmployees(response.data.employees || []);
        setBranchAccess(response.data.branchaccess || []);
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };
  useEffect(() => {
    fetchAllUsernames();
  }, []);

  const handleDelete = async (index) => {
    const usernameToDelete = employees[indexOfUser].username;
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
      setEmployees((prevData) => prevData.filter((_, i) => i !== index));
      // console.log(`User ${usernameToDelete} deleted successfully.`);
      toast.success(`User ${usernameToDelete} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

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

  const addDepartment = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/addDepartment`, {
        orgcode: localStorage.getItem("orgcode"),
        orgname: localStorage.getItem("orgname"),
        category: category.Department, // this will be department name
      });
      if (response.status === 200) {
        console.log("Success:", response.data.message);
        toast.success("Department Added");
        getDepartment();
      }
    } catch (error) {
      toast.error("Failed to add department");
      console.error("Failed to add department:", error);
    }
  };

  useEffect(() => {
    if (branchAccess.length > 0) {
      const branches = [
        ...new Set(branchAccess.map((access) => access.ownbranchname)),
      ]
        .filter(Boolean)
        .map((clientname) => ({ clientname }));
      setUniqueBranches(branches);
    }
  }, [branchAccess]);

  // Map branch access to users
  useEffect(() => {
    if (employees.length > 0 && branchAccess.length > 0) {
      const branchNames = {};

      // Group branch names by username
      branchAccess.forEach((access) => {
        if (!branchNames[access.username]) {
          branchNames[access.username] = [];
        }

        // Only add branch name if it's not already in the array
        if (!branchNames[access.username].includes(access.ownbranchname)) {
          branchNames[access.username].push(access.ownbranchname);
        }
      });

      setUserBranchMap(branchNames);
    }
  }, [employees, branchAccess]);

  const handleAccess = async (index) => {
    // Access the username at the specified index in the allData state

    const codeoforg = localStorage.getItem("orgcode");
    const nameoforg = localStorage.getItem("orgname");
    const username = filteredEmployees[index].username;
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
    localStorage.setItem("fullnameforaccess", filteredEmployees[index].fullname);
    const encodedUsername = encodeURIComponent(username);
    window.open(`/#/UserListAccess/${encodedUsername}`, "_blank");
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const newTheme = localStorage.getItem("theme") || "light";
      setTheme(newTheme);
    };

    window.addEventListener("storage", handleStorageChange);

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
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      searchedValue === "" ||
      employee.fullname.toLowerCase().includes(searchedValue.toLowerCase()) ||
      employee.username.toLowerCase().includes(searchedValue.toLowerCase());

    const matchesBranch =
      !selectedBranch ||
      (userBranchMap[employee.username] &&
        userBranchMap[employee.username].includes(selectedBranch));

    const matchesDepartment =
      activeTab === "All" || employee.department === activeTab;

    return matchesSearch && matchesBranch && matchesDepartment;
  });

  const handleNavigate = (employee) => {
    navigate("/Generate_Report");
    localStorage.setItem("empnameforaccess", employee.username);
    localStorage.setItem(
      "branchnames",
      JSON.stringify(userBranchMap[employee.username] || [])
    );
    localStorage.setItem("fullname", employee.fullname);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className={styles.container}>
        <div className={styles.firstRow}>
          <div
            onClick={() => {
              navigate("/dashboard");
            }}
            className="backButton"
            style={{ marginTop: "-16px" }}
          >
            <ArrowCircleLeft />
          </div>
          <button
            className="invisible-btn-style"
            style={{ position: "absolute", left: "40px", top: "2px" }}
            onClick={() => {
              refreshData();
            }}
          >
            <RefreshBtn />
          </button>
          <div className={styles.importBox}>
            <div className={styles.Title}>
              <h4 style={{ marginBottom: "0px" }}>List of Users</h4>
            </div>
          </div>
        </div>

        <div classname={styles.secondRow}>
          <div className={styles.tabsRow} style={{ margin: "10px 0px " }}>
            <div className={styles.tabsContainer}>
              <div
                key={"tab1"}
                className={
                  "All" === activeTab
                    ? `${styles.tabs} ${styles.ActiveTab}`
                    : styles.tabs
                }
                onClick={() => {
                  setactiveTab("All");
                }}
                style={{
                  fontSize: "11px",
                  padding: "9px 0px",
                  width: "150px",
                }}
              >
                {"All"}
              </div>
              {departmentList.map((dept) => (
                <div
                  key={dept}
                  className={
                    activeTab === dept
                      ? `${styles.tabs} ${styles.ActiveTab}`
                      : styles.tabs
                  }
                  onClick={() => setactiveTab(dept)}
                  style={{
                    fontSize: "11px",
                    padding: "9px 0px",
                    width: "150px",
                  }}
                >
                  {dept}
                </div>
              ))}

              <div className="search-button">
                <svg
                  onClick={() => {
                    setCategory("")
                    setCurrentPopup("addCategory");
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
            </div>
          </div>
        </div>

        <div className={styles.secondRow}>
          <div className={styles.secondRowBlocks}>
            <div className={styles.searchBox}>
              <input
                type="text"
                placeholder="Search User"
                className={styles.searchInput}
                autoComplete="off"
                value={searchedValue}
                onChange={(e) => setSearchedValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    console.log("Searching for:", searchedValue);
                  }
                }}
              />
              <div style={{ margin: "0px 18px", marginBottom: "5px" }}>
                <SearchBtn />
              </div>
            </div>
            <div className={styles.branchFilter}>
              <label className={styles.importLabelWidth}>Branchs: </label>
              <div style={{ display: "flex" }}>
                <NewDropdownInput
                  type="type1"
                  options={branchesOptions}
                  placeholder={"All Branches"}
                  selectedValue={selectedBranch}
                  setSelectedValue={setSelectedBranch}
                  width={"250px"}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.fourthRow}>
          <div style={{ maxHeight:"360px", overflowY: "scroll" }}>
            <table
              className="min-w-full border-separate"
              style={{
                width: "100%",
                borderCollapse: "separate",
                borderSpacing: "0 8px",
              }}
            >
              <thead className={styles.tableHead}>
                <tr>
                  {[
                    "Full Name",
                    "Username",
                    "Branch Name",
                    "Department",
                    "Report",
                    "Action",
                  ].map((col, index) => (
                    <th
                      key={index}
                      className="px-4 py-2 text-left"
                      style={{ fontWeight: "500", textAlign: "center" }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredEmployees.map((employee, rowIndex) => (
                  <tr
                    onDoubleClick={() => handleAccess(rowIndex)}
                    key={rowIndex}
                    className="rounded-lg shadow-md"
                    style={{
                      backgroundColor:
                        theme === "dark"
                          ? rowIndex % 2 === 0
                            ? "#3B5472"
                            : "#263A52"
                          : rowIndex % 2 === 0
                          ? "#D8F0FD"
                          : "#F6FCFF",
                      transition: "background-color 0.3s ease",
                      height: "44px",
                    }}
                  >
                    <td
                      className={styles.tableData}
                      style={{ textAlign: "center", padding: "8px" }}
                    >
                      {employee.fullname}
                    </td>
                    <td
                      className={styles.tableData}
                      style={{ textAlign: "center", padding: "8px" }}
                    >
                      {employee.username}
                    </td>
                    <td
                      className={styles.tableData}
                      style={{ textAlign: "center", padding: "8px" }}
                    >
                      {(userBranchMap[employee.username] || []).join(", ")}
                    </td>
                    <td
                      className={styles.tableData}
                      style={{ textAlign: "center", padding: "8px" }}
                    >
                      {employee.department}
                    </td>
                    <td
                      className={styles.tableData}
                      style={{ textAlign: "center", padding: "8px" }}
                    >
                      <div
                        style={{
                          border: "none",
                          padding: "0px",
                          borderRadius: "8px",
                          fontWeight: "500",
                          cursor: "pointer",
                          color: "var(--link-color)",
                        }}
                        onClick={() => handleNavigate(employee)}
                      >
                        <u>Generate Report</u>
                      </div>
                    </td>
                    <td
                      className={`${styles.tableData} px-4 py-2`}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <div
                        onClick={() => {
                          setRemark("");
                          setCurrentPopup("Deletion");
                          setIndexOfUser(rowIndex);
                          setuserToDelete(employee.username);
                        }}
                      >
                        <DeleteBtn
                          fill={
                            theme === "dark" ? "#f8d7da" : "var(--page-title)"
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
      </div>
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
          title={`Add Department`}
          setCurrentPopup={setCurrentPopup}
          fields={contactFields}
          value={category}
          setValue={setCategory}
          handleAdd={addDepartment}
          firstButtonText={"Add"}
          secondButtonText={"Close"}
          selection={"none"}
          left={"60%"}
          top={"50%"}
          width={"330px"}
        />
      )}
    </motion.div>
  );
};

export default User_Report;
