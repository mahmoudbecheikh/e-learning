import React, { useState, useEffect } from "react";
import "./forum.css";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Forums = () => {
  const [messages, setMessages] = useState([]);
  const [selectedForum, setselectedForum] = useState(null);
  const [forums, setForums] = useState([]);
  const [contenu, setContenu] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/messages/forums")
      .then((response) => {
        if (response.data) {
          setForums(response.data);
        } else {
          setForums([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  });

  useEffect(() => {
    if (selectedForum !== null) {
      const forum = forums.find((forum) => forum._id === selectedForum._id);
      if (forum) setMessages(forum.messages);
    }
    socket.on("newMessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
  
    return () => {
      socket.off("newMessage");
    };
  }, [selectedForum]);


  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      contenu: contenu,
      user: localStorage.getItem("email"),
      forum: selectedForum._id,
      date: new Date().toISOString(),
    };
    socket.emit("newMessage", payload);
    setContenu("");
  };
  return (
    
    <div className="app">
      <div className="sidebar">
        <div className="user-list">
          {forums.map((forum) => (
            <div key={forum._id} onClick={() => setselectedForum(forum)}>
              <p>
                {forum.user.prenom} {forum.user.nom} 
              </p>
              <p> <span>Formation</span> : {forum.formation.titre}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="main">
        {selectedForum && (
          <form onSubmit={handleSubmit} className="message-form">
            <input
              type="text"
              placeholder="Message"
              value={contenu}
              onChange={(e) => setContenu(e.target.value)}
              className="message-input"
            />
            <button type="submit" className="message-button">
              Enovyer
            </button>
          </form>
        )}
        <div className="message-list">
          {messages.map((message) => (
            <div key={message._id}>
              <h6>{message.contenu}</h6>
              <p>{message.user.prenom}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forums;
