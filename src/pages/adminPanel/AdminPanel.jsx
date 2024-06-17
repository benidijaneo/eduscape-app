import React, { useEffect, useState } from 'react';
import './AdminPanel.scss';
import { AdminNavBar } from '../../components/adminNavBar/adminNavBar';
import { TableContent } from '../../components/tableContent/tableContent';
import newRequest from '../../utils/newRequest';

export const AdminPanel = () => {
  const [selectedTab, setSelectedTab] = useState('Tutor Approvals');
  const [forApprovalAccounts, setforApprovalAccounts] = useState([]);
  const [trigger, setTrigger] = useState('');

  const handleTabClick = (tab) => {
    console.log('click');
    setSelectedTab(tab);
  };

  const handleTrigger = (t) => {
    setTrigger((trigger) => trigger.concat(t));
  };

  useEffect(() => {
    const fetchUsersForApproval = async () => {
      try {
        const res = await newRequest.get(
          `/users/accounts/for-approval`
        );
        console.log(res.data);
        setforApprovalAccounts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsersForApproval();
  }, []);

  return (
    <div className="wrapper">
      <AdminNavBar
        onTabClick={handleTabClick}
        selectedTab={selectedTab}
      />
      <TableContent
        selectedTab={selectedTab}
        trigger={trigger}
        onHandleTrigger={handleTrigger}
        tutorData={forApprovalAccounts}
      />
    </div>
  );
};
