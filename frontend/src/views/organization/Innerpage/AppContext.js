import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; // ✅ Import useLocation
import API_BASE_URL from "src/config/config";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [generalData, setGeneralData] = useState({});
  const [registrationData, setRegistrationData] = useState({});
  const [accountData, setAccountData] = useState({});
  const [contacts, setContacts] = useState([]);
  const [aliasName, setaliasName] = useState("");
  const [isBranchAdded, setIsBranchAdded] = useState(false);
  const [checkedBoxOptions, setCheckedBoxOptions] = useState([]);
  const [orgganizationTypeOptions, setOrgganizationTypeOptions] = useState([]);
  const [isshown, setIsShown] = useState("general");
  const [allBranches, setAllBranches] = useState([]);
  const [branchInUrl, setbranchInUrl] = useState("");
  const [selectedId, setselectedId] = useState("");

  const location = useLocation(); // ✅ Get location directly inside AppContext

  console.log("Current URL:", location.search); // ✅ Check if location updates correctly
  

  const fetchData = async () => {
    const queryParams = new URLSearchParams(location.search);
    const alias = queryParams.get("alias");
    setaliasName(alias);
    const branchname = queryParams.get("branch");
    setbranchInUrl(branchname);
    const id = queryParams.get("id");
    setselectedId(id);
    console.log("alias:", alias, "branchname:", branchname, "id:", id); // ✅ Check if location updates correctly

    try {
      const response = await axios.get(`${API_BASE_URL}/allFetch`, {
        params: {
          alias: alias,
          branchname: branchname,
          id: id,
        },
      });

      setGeneralData(response.data);
      setRegistrationData({
        PAN: response.data.PAN,
        GST: response.data.GST,
        IEC: response.data.IEC,
      });
      setAccountData({
        creditdays: response.data.creditdays,
        followup2: response.data.followup2,
        followup3: response.data.followup3,
      });
      setContacts(response.data.contactDetails || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location]); // ✅ Fetch data whenever location changes

  return (
    <AppContext.Provider
      value={{
        selectedId,
        branchInUrl,
        aliasName,
        generalData,
        registrationData,
        accountData,
        contacts,
        isBranchAdded,
        checkedBoxOptions,
        orgganizationTypeOptions,
        isshown,
        allBranches,
        setAllBranches,
        setIsShown,
        setCheckedBoxOptions,
        setOrgganizationTypeOptions,
        setIsBranchAdded,
        setGeneralData,
        setRegistrationData,
        setAccountData,
        setContacts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
