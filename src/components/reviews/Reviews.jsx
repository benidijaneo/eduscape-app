import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import newRequest from '../../utils/newRequest';
import Review from '../review/Review';
import './Reviews.scss';
const Reviews = ({ gigId }) => {
  const [orders, setOrders] = useState([]);
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ['reviews'],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post('/reviews', review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews']);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ gigId, desc, star });
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await newRequest.get(`/orders`);
        const gigIDs = res.data.map(({ gigId }) => gigId);
        setOrders(gigIDs);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? 'loadking'
        : error
        ? 'Something went wrong!'
        : data.map((review) => (
            <Review key={review._id} review={review} />
          ))}
      {orders.includes(gigId) && (
        <div className="add">
          <h3>Add a review</h3>
          <form action="" className="addForm" onSubmit={handleSubmit}>
            <input type="text" placeholder="Write your opinion" />
            <select name="" id="">
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Reviews;
