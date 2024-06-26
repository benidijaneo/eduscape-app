import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Messages.scss';
import newRequest from '../../utils/newRequest';
import moment from 'moment';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [conData, setConData] = useState({});

  // MODAL

  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

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

  const handleAddGmeetLink = async (e, convID) => {
    e.preventDefault();
    const gmeetLink = inputValue;

    try {
      const res = await newRequest.post(
        `/conversations/link/${convID}`,
        {
          gmeetLink,
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      handleCloseModal();
      queryClient.invalidateQueries(['conversations']);
    }
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
              {currentUser.isSeller && <th>Google Meet</th>}
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
                        ? ssl(c.buyerImg)
                        : ssl(c?.sellerImg)
                    }
                    alt="icon"
                  />
                </td>
                <td>
                  {currentUser.isSeller ? c.buyerName : c.sellerName}
                </td>
                <td>
                  <Link
                    to={`/message/${c.id}sepa${c.gmeetLink}`}
                    className="link"
                  >
                    {c?.lastMessage?.substring(0, 100)}...
                  </Link>
                </td>
                <td>{moment(c.updatedAt).fromNow()}</td>
                {currentUser.isSeller && (
                  <td>
                    <button onClick={handleOpenModal}>
                      Provide link
                    </button>
                    {showModal && (
                      <div className="modal">
                        <div className="modal-content">
                          <div className="close-btn">
                            <button
                              className="close"
                              onClick={handleCloseModal}
                            >
                              Close
                            </button>
                          </div>
                          <form className="gmeet-form">
                            <input
                              type="text"
                              value={inputValue}
                              name="gmeetLink"
                              onChange={handleInputChange}
                              placeholder="Enter Google Meet Link"
                            />

                            <button
                              onClick={(e) =>
                                handleAddGmeetLink(e, c._id)
                              }
                            >
                              Submit
                            </button>
                          </form>
                        </div>
                      </div>
                    )}
                  </td>
                )}
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
