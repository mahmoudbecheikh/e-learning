import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./message.css";

const socket = io("http://localhost:5000");

const Messagesection = () => {
  const [messages, setMessages] = useState([]);
  const [forum, setForum] = useState(null);
  const [contenu, setContenu] = useState("");
  const params = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:5000/messages", {
        params: {
          idClient: localStorage.getItem("id"),
          idFormation: params.id,
        },
      })
      .then((response) => {
        const forumData = response.data;
        if (forumData && forumData.messages) {
          setForum(forumData);
          setMessages(forumData.messages);
        } else {
          console.log('Famech');
          axios
            .post("http://localhost:5000/messages/forum", {
              user: localStorage.getItem("email"),
              formation: params.id,
            })
            .then((response) => {
              console.log(response);
              setForum(response.data);
            })
            .catch((error) => {
              console.error("Error creating forum:", error);
            });

          setForum(null);
          setMessages([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
        setForum(null);
        setMessages([]);
      });

    socket.on("newMessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [params.id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      contenu: contenu,
      user: localStorage.getItem("email"),
      forum: forum ? forum._id : null,
      date: new Date().toISOString(),
    };
    socket.emit("newMessage", payload);
    setContenu("");
  };

  return (
    <div className="message-section">
      <ul
        className={`message-list ${
          messages.length === 0 ? "empty" : "not-empty"
        }`}
      >
        {messages.map((msg) => (
          <li key={msg._id} className="message-item">
            <strong>
              {msg.user.nom} {msg.user.prenom}:{" "}
            </strong>
            {msg.contenu}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          placeholder="Your comment"
          value={contenu}
          onChange={(e) => setContenu(e.target.value)}
          className="message-input"
        />
        <button type="submit" className="message-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Messagesection;
