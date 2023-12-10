import React from 'react';
import { Link } from 'react-router-dom';
import './GigCard.scss';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

export const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['gigUser'],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <Link to="/gig/123" className="link">
      <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
          {isLoading ? (
            'loading'
          ) : error ? (
            'error'
          ) : (
            <div className="user">
              <img src={data.img || '/img/noavatar.jpg'} alt="" />
              <span>{data.username}</span>
            </div>
          )}
          <p>{item.desc}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>
              {Math.round(item.totalStars / item.startNumber) ===
              Infinity
                ? ''
                : Math.round(item.totalStars / item.startNumber)}
            </span>
          </div>
        </div>
        <hr />
        <div className="details">
          <img src="./img/heart.png" alt="" />
          <span>STARTING AT</span>
          <h2>Php {item.price}</h2>
        </div>
      </div>
    </Link>
  );
};
