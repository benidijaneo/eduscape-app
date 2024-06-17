import React, { useState } from "react";
import "./AdminPanel.scss";
import { AdminNavBar } from "../../components/adminNavBar/adminNavBar";
import { TableContent } from "../../components/tableContent/tableContent";

export const AdminPanel = () => {
  const [selectedTab, setSelectedTab] = useState("Tutor Approvals");

  const handleTabClick = (tab) => {
    console.log("click");
    setSelectedTab(tab);
  };
  return (
    <div className="wrapper">
      <AdminNavBar onTabClick={handleTabClick} selectedTab={selectedTab} />
      <TableContent selectedTab={selectedTab} />
    </div>
  );
};
