import React, { useEffect, useState } from "react";
import "./tableContent.scss";
import newRequest from "../../utils/newRequest";
import upload from "../../utils/upload";

import attachment from "/img/attachment.svg";

export const TableContent = ({ selectedTab, tutorData, onApprove }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [file, setFile] = useState(null);
  const [revRecords, setRevRecords] = useState([]);

  const handleUploadQR = async (e) => {
    e.preventDefault();

    const url = await upload(file);
    console.log("uploaded");
    try {
      const id = currentUser._id;
      await newRequest.post(`/users/upload-gcash/${id}`, {
        imgURL: url,
      });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(revRecords);
  useEffect(() => {
    const getRevenueRecords = async () => {
      try {
        const res = await newRequest.get(`/payment/records/all`);

        setRevRecords(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getRevenueRecords();
  }, []);

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
            {tutorData.map((tutor) => (
              <tr key={tutor._id}>
                <td className="td-custom">{`${tutor.firstName} ${tutor.lastName}`}</td>
                <td className="td-custom">
                  <button className="custom-btn">
                    <span className="btn-flex">
                      <img className="attachment" src={attachment} alt="icon" />
                      <a href={tutor.img} target="_blank" rel="noreferrer">
                        Click to see attachment
                      </a>
                    </span>
                  </button>
                </td>
                <td className="td-custom">
                  <button className="custom-btn">
                    <span className="btn-flex">
                      <img className="attachment" src={attachment} alt="icon" />
                      <a href={tutor.validID} target="_blank" rel="noreferrer">
                        Click to see attachment
                      </a>
                    </span>
                  </button>
                </td>
                <td className="td-custom">
                  <button className="custom-btn">
                    <span className="btn-flex">
                      <img className="attachment" src={attachment} alt="icon" />
                      <a href={tutor.resume} target="_blank" rel="noreferrer">
                        Click to see attachment
                      </a>
                    </span>
                  </button>
                </td>
                <td className="td-custom">
                  <button
                    className="custom-btn"
                    onClick={() => {
                      onApprove(tutor._id);
                    }}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
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
            {revRecords.map((record) => (
              <tr key={record._id}>
                <td className="td-custom">{record.gigData.title}</td>
                <td className="td-custom">{`${record.buyerData.firstName} ${record.buyerData.lastName}`}</td>
                <td className="td-custom">
                  <button className="custom-btn">
                    <span className="btn-flex">
                      <img className="attachment" src={attachment} alt="icon" />
                      <a
                        href={record.referenceNumber}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Click to see attachment
                      </a>
                    </span>
                  </button>
                </td>
                <td className="td-custom">
                  <button className="custom-btn">Approve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selectedTab === "Gcash QR" && (
        <>
          <form className="custom-form">
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button className="custom-btn" onClick={(e) => handleUploadQR(e)}>
              Upload
            </button>
          </form>
        </>
      )}
    </div>
  );
};
