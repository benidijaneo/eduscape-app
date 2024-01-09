import React from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  // console.log(data[0].conversationId);
  async function getLamar(id) {
    await newRequest.get(`/single/${id}`).then((res) => console.log(res));
  }

  // getLamar(data.conversationId);
  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link>
        </span>
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          <div className="messages">
            {data.map((m) => (
              <div
                className={m.userId === currentUser._id ? "owner item" : "item"}
                key={m._id}
              >
                <img
                  src={m.userId === currentUser._id ? currentUser.img : ""}
                  alt="User Profile"
                />
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="write a message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};
