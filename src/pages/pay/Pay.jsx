import React, { useEffect, useState } from 'react';
import './Pay.scss';
import GcashQR from '/img/gcash-qr.png';
import newRequest from '../../utils/newRequest';

const Pay = () => {
  const [adminData, setAdminData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAdminData = async () => {
      setIsLoading(true);
      try {
        const res = await newRequest.get(
          '/users/admin/66701a8d1586b3b0024aa83c'
        );
        if (res.status == 200) setIsLoading(false);

        setAdminData(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div className="payment-container">
      <div className="qr-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <img src={adminData.gcashQR} alt="QR" height={'800px'} />
        )}
      </div>
      <form>
        <label htmlFor="">Reference No. </label>
        <input type="file" />
        <button type="submit">Confirm</button>
      </form>
    </div>
  );
};

export default Pay;
