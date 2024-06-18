import React, { useState } from 'react';
import upload from '../../utils/upload';
import './Register.scss';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Register = () => {
  const [file, setFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [validIDFile, setValidIDFile] = useState(null);
  const [user, setUser] = useState({});

  console.log(user);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  const uploadPDF = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'eduScape');
    data.append('resource_type', 'raw');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/eduscape/raw/upload',
        data
      );

      const { url } = res.data;
      return url;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);
    const urlResume = await uploadPDF(resumeFile);
    const urlValidID = await upload(validIDFile);
    try {
      await newRequest.post('/auth/register', {
        ...user,
        img: url,
        resume: urlResume,
        validID: urlValidID,
      });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">First Name</label>
          <input
            name="firstName"
            type="text"
            placeholder=""
            onChange={handleChange}
          />
          <label htmlFor="">Last Name</label>
          <input
            name="lastName"
            type="text"
            placeholder=""
            onChange={handleChange}
          />
          <label htmlFor="">Birthdate</label>
          <input
            name="birthdate"
            type="date"
            onChange={handleChange}
          />
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder=""
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
          />
          <label htmlFor="">Profile Picture</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="">Province</label>
          <input
            name="province"
            type="text"
            placeholder="Zambales"
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1>I want to become a tutor</h1>
          <div className="toggle">
            <label htmlFor="">Activate the tutor account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="09606473921"
            onChange={handleChange}
          />

          <label htmlFor="">Social Links</label>
          <input
            name="facebook"
            type="text"
            placeholder="Facebook"
            onChange={handleChange}
          />
          <input
            name="gmail"
            type="text"
            placeholder="Gmail"
            onChange={handleChange}
          />
          <input
            name="linkedin"
            type="text"
            placeholder="LinkedIn"
            onChange={handleChange}
          />

          <label htmlFor="">Resume</label>
          <input
            type="file"
            onChange={(e) => setResumeFile(e.target.files[0])}
          />
          <label htmlFor="">Valid ID</label>
          <input
            type="file"
            onChange={(e) => setValidIDFile(e.target.files[0])}
          />

          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default Register;
