import React, { useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", {
        username,
        password,
      });

      if (!res.data.isSeller) {
        localStorage.setItem("currentUser", JSON.stringify(res.data));

        if (res.data.isAdmin) {
          navigate("/eduscape-admin");
        } else {
          navigate("/");
        }
      } else if (res.data.isApproved === false) {
        setError("You are not yet approved.");
      } else {
        localStorage.setItem("currentUser", JSON.stringify(res.data));

        if (res.data.isAdmin) {
          navigate("/eduscape-admin");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="login-container">
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
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
      <div className="right">
        <div className="triple-e">
          <h3>EDUSCAPE.</h3>
          <h3>ELEVATE.</h3>
          <h3>EDUCATION.</h3>
        </div>
      </div>
    </div>
  );
};
