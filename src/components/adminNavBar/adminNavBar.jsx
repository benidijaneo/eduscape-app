import React from "react";
import "./adminNavBar.scss";

export const AdminNavBar = ({ onTabClick, selectedTab }) => {
  return (
    <div className="admin-navbar">
      <button
        className={selectedTab === "Tutor Approvals" ? "active" : ""}
        onClick={() => onTabClick("Tutor Approvals")}
      >
        Tutor Approvals
      </button>
      <button
        className={selectedTab === "Revenue Records" ? "active" : ""}
        onClick={() => onTabClick("Revenue Records")}
      >
        Revenue Records
      </button>
      <button
        className={selectedTab === "Gcash QR" ? "active" : ""}
        onClick={() => onTabClick("Gcash QR")}
      >
        Gcash QR
      </button>
    </div>
  );
};
