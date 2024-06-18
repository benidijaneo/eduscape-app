import React, { useEffect, useState } from "react";
import "./AdminPanel.scss";
import { AdminNavBar } from "../../components/adminNavBar/adminNavBar";
import { TableContent } from "../../components/tableContent/tableContent";
import newRequest from "../../utils/newRequest";

export const AdminPanel = () => {
  const [selectedTab, setSelectedTab] = useState("Tutor Approvals");
  const [forApprovalAccounts, setForApprovalAccounts] = useState([]);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    const fetchUsersForApproval = async () => {
      try {
        const res = await newRequest.get(`/users/accounts/for-approval`);
        setForApprovalAccounts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsersForApproval();
  }, []);

  const handleApprove = async (id) => {
    try {
      const res = await newRequest.post(`/users/approve/${id}`);
      console.log(res.data);

      // Update state to remove the approved tutor
      setForApprovalAccounts((prevData) =>
        prevData.filter((tutor) => tutor._id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="wrapper">
      <AdminNavBar onTabClick={handleTabClick} selectedTab={selectedTab} />
      <TableContent
        selectedTab={selectedTab}
        tutorData={forApprovalAccounts}
        onApprove={handleApprove}
      />
    </div>
  );
};
