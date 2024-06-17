import React, { useState } from 'react';
import './Login.scss';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';
import login from '/img/login.svg';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post('/auth/login', {
        username,
        password,
      });
      localStorage.setItem('currentUser', JSON.stringify(res.data));

      if (res.data.isAdmin == true) {
        navigate('/eduscape-admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="login-container">
      {/* <div className="left">
        <img className="left-img" src={login} />
      </div> */}
      <div className="login">
        <form onSubmit={handleSubmit}>
          <h1>Sign in</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder=""
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="">Password</label>
          <input
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          {error && error}
        </form>
      </div>
    </div>
  );
};
