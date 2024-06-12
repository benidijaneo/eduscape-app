import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Messages.scss';
import newRequest from '../../utils/newRequest';
import moment from 'moment';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [conData, setConData] = useState({});

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['conversations']);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  const ssl = (data) => {
    const ht = data.split(':')[0] + 's';
    return ht + ':' + data.split(':')[1];
  };

  useEffect(() => {
    const fetchConversations = async () => {
      setIsLoading(true);

      try {
        const res = await newRequest.get(`/conversations`);
        localStorage.setItem(
          'conversations',
          JSON.stringify(res.data)
        );
        setConData(JSON.parse(localStorage.getItem('conversations')));
        console.log(res);
        setData(() => [...res.data]);
      } catch (err) {
        setIsLoading(true);
        setError(true);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, []);

  const sellerImg = conData[0]?.sellerImg;
  const buyerImg = conData[0]?.buyerImg;

  return (
    <div className="messages">
      {isLoading ? (
        'loading'
      ) : error ? (
        'error'
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <tr>
              <th>Profile</th>
              <th>{currentUser.isSeller ? 'Buyer' : 'Seller'}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {data.map((c) => (
              <tr
                className={
                  ((currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer)) &&
                  'active'
                }
                key={c.id}
              >
                <td>
                  <img
                    src={
                      currentUser.isSeller
                        ? ssl(buyerImg)
                        : ssl(sellerImg)
                    }
                    alt="icon"
                  />
                </td>
                <td>
                  {currentUser.isSeller ? c.buyerName : c.sellerName}
                </td>
                <td>
                  <Link to={`/message/${c.id}`} className="link">
                    {c?.lastMessage?.substring(0, 100)}...
                  </Link>
                </td>
                <td>{moment(c.updatedAt).fromNow()}</td>
                <td>
                  {((currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer)) && (
                    <button onClick={() => handleRead(c.id)}>
                      Mark as Read
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};
