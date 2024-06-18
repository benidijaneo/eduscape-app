import React, { useEffect, useState } from 'react';
import './Pay.scss';
import newRequest from '../../utils/newRequest';
import { useParams } from 'react-router-dom';
import upload from '../../utils/upload';
import { useNavigate } from 'react-router-dom';

import payment from '/img/money-transfer.svg';

const Pay = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [adminData, setAdminData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [gig, setGig] = useState({});
  const [sellerData, setSellerData] = useState([]);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = await upload(file);

    try {
      const res = await newRequest.post(`/payment/record/create`, {
        gigData: gig,
        buyerData: currentUser,
        sellerData: sellerData,
        referenceNumber: url,
      });

      if (res.status == 201) navigate('/success');

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getSellerData = async (id) => {
      try {
        const res = await newRequest.get(`/users/${id}`);
        setSellerData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

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
        getSellerData(res.data.userId);
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
      <div className="left">
        <h3>Transaction Details</h3>
        <p>
          You are one step away from your learning adventure. Scan the
          QR Code and start exploring a world of knowledge with our
          dedicated tutors by your side.
        </p>
        <hr />
        <h4>AMOUNT TO BE PAID: {gig.price}</h4>
        Course Name: {gig.title}
        <img className="payment-svg" src={payment} alt="" />
      </div>
      <div className="right">
        <div className="qr-container">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <img src={adminData.gcashQR} alt="QR" height={500} />
          )}
        </div>
        <form className="custom-form">
          <label htmlFor="file-upload" className="custom-file-upload">
            Upload Reference No.
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            className="custom-file-upload"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default Pay;
