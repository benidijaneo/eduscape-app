import React, { useState } from 'react';
import './tableContent.scss';
import newRequest from '../../utils/newRequest';
import axios from 'axios';
import upload from '../../utils/upload';

export const TableContent = ({
  selectedTab,
  trigger,
  onHandleTrigger,
  tutorData,
}) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [file, setFile] = useState(null);

  const handleApprove = async (id) => {
    try {
      const res = await newRequest.post(`/users/approve/${id}`);

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = () => {
    setApprove((prevApprove) => !prevApprove);
  };

  const [approve, setApprove] = useState(false);

  const handleUploadQR = async (e) => {
    e.preventDefault();

    const url = await upload(file);
    console.log('uploaded');
    try {
      const id = currentUser._id;
      await newRequest.post(`/users/upload-gcash/${id}`, {
        imgURL: url,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="table-container">
      {selectedTab === 'Tutor Approvals' && (
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
                <td className="td-custom">Data 2</td>
                <td className="td-custom">Data 3</td>
                <td className="td-custom">Data 4</td>
                <td className="td-custom">
                  {/* <button
                    onClick={() => {
                      handleApprove(tutor._id);
                      onHandleTrigger(
                        `${trigger}${
                          Math.floor(Math.random() * 10) + 1
                        }`
                      );
                    }}
                  >
                    approve
                  </button> */}
                  <button onClick={handleClick}>
                    {approve ? 'Disapprove' : 'Approve'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selectedTab === 'Revenue Records' && (
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
      {selectedTab === 'Gcash QR' && (
        <>
          <form>
            <label htmlFor="">Gcash QR</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button onClick={(e) => handleUploadQR(e)}>upload</button>
          </form>
        </>
      )}
    </div>
  );
};
