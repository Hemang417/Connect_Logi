import React, { useState, createContext, useContext } from 'react';
import API_BASE_URL from "src/config/config";

const OrgApprovalContext = createContext();

export const OrgApprovalProvider = ({ children }) => {
  const [latestOrg, setLatestOrg] = useState([]);
  const [approvedOrgs, setapprovedOrgs] = useState([]);

  const updateLatestOrg = () => {
    checker();
  };

  const checker = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getapprovedorg`, {
        params: {
          orgname: localStorage.getItem('orgname'),
          orgcode: localStorage.getItem('orgcode'),
          uniquevalue: uniquevalue
        },
      });

      const data = response.data.map(org => {
        const remark = org.remark;
        return { ...org, remark };
      });

      setapprovedOrgs(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <OrgApprovalContext.Provider value={{ latestOrg, updateLatestOrg, approvedOrgs }}>
      {children}
    </OrgApprovalContext.Provider>
  );
};