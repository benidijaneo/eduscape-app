import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://eduscape-api.onrender.com/api",
  withCredentials: true,
});

export default newRequest;
