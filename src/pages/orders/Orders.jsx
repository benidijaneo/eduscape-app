import React, { useEffect, useState } from 'react';
import './Orders.scss';
import newRequest from '../../utils/newRequest';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';

export const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [revRecords, setRevRecords] = useState([]);

  const lamar = revRecords.filter(
    (order) => order.buyerData._id == currentUser._id
  );

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const res = await newRequest.get(`/payment/all/orders`);
        console.log(res);
        setRevRecords(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders">
      {isLoading ? (
        'loading'
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Contact</th>
            </tr>

            {lamar.map((record) => (
              <tr key={record._id}>
                <td>
                  <img
                    className="image"
                    src={record.gigData.images[0]}
                    alt=""
                  />
                </td>
                <td>{record.gigData.title}</td>
                <td>{record.gigData.price}</td>
                <td>
                  <img
                    className="message-icon"
                    src="./img/message.png"
                    alt=""
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};
