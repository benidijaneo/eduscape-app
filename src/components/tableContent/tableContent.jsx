import React from "react";
import "./tableContent.scss";
export const TableContent = ({ selectedTab }) => {
  return (
    <div className="table-container">
      {selectedTab === "Tutor Approvals" && (
        <table className="table-custom">
          <thead>
            <tr>
              <th className="th-custom">Tutor Name</th>
              <th className="th-custom">Profile Picture</th>
              <th className="th-custom">Valid ID</th>
              <th className="th-custom">Resume</th>
              <th className="th-custom">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="td-custom">Data 1</td>
              <td className="td-custom">Data 2</td>
              <td className="td-custom">Data 3</td>
              <td className="td-custom">Data 4</td>
              <td className="td-custom">Data 5</td>
            </tr>
          </tbody>
        </table>
      )}
      {selectedTab === "Revenue Records" && (
        <table className="table-custom">
          <thead>
            <tr>
              <th className="th-custom">Course Name</th>
              <th className="th-custom">Buyer Name</th>
              <th className="th-custom">Reference No.</th>
              <th className="th-custom">Payment Approval</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="td-custom">Data A</td>
              <td className="td-custom">Data B</td>
              <td className="td-custom">Data C</td>
              <td className="td-custom">Data D</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};
