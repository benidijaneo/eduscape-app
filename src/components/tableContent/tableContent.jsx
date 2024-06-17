import React from "react";
import "./tableContent.scss";
export const TableContent = ({ selectedTab }) => {
  return (
    <div className="table-container">
      {selectedTab === "Tutor Approvals" && (
        <table className="table-custom">
          <thead>
            <tr>
              <th className="th-custom">Tutor Name:</th>
              <th className="th-custom">Header 2</th>
              <th className="th-custom">Header 3</th>
              <th className="th-custom">Header 4</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="td-custom">Data 1</td>
              <td className="td-custom">Data 2</td>
              <td className="td-custom">Data 3</td>
              <td className="td-custom">Data 4</td>
            </tr>
          </tbody>
        </table>
      )}
      {selectedTab === "Revenue Records" && (
        <table className="table-custom">
          <thead>
            <tr>
              <th className="th-custom">Course Name:</th>
              <th className="th-custom">Header 2</th>
              <th className="th-custom">Header 3</th>
              <th className="th-custom">Header 4</th>
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
