import React, { useEffect, useState } from 'react';
import './Pay.scss';
import GcashQR from '/img/gcash-qr.png';
import newRequest from '../../utils/newRequest';
import { useParams } from 'react-router-dom';
import upload from '../../utils/upload';

const Pay = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [adminData, setAdminData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [gig, setGig] = useState({});
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = await upload(file);

    try {
      const res = await newRequest.post(`/payment/record/create`, {
        gigData: gig,
        buyerData: currentUser,
        referenceNumber: url,
      });

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

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

    const getGig = async () => {
      try {
        const res = await newRequest.get(`/gigs/single/${id}`);
        setGig(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getGig();
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
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Confirm
        </button>
      </form>
    </div>
  );
};

export default Pay;
