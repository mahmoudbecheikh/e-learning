import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useParams } from "react-router-dom";
import './message.css'; 

const socket = io('http://localhost:5000'); 

const Messagesection = () => {
  const [messages, setMessages] = useState([]);
  const [contenu, setContenu] = useState('');
  const params = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/formation/${params.id}`).then((response) => {
      setMessages(response.data.forums);
    });

    socket.on('newMessage', (msg) => {
      console.log(msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, [params.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { contenu: contenu, user: localStorage.getItem('email'), formation: params.id, date: Date.now().toString() };
    socket.emit('newMessage', payload);
    setContenu('');
  };

  return (
    <div className="message-section">
      <ul className={`message-list ${messages.length === 0 ? 'empty' : 'not-empty'}`}>
        {messages.map((msg) => (
          <li key={msg._id} className="message-item">
            <strong>{msg.user.nom} {msg.user.prenom}: </strong> 
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
        <button type="submit" className="message-button">Submit</button>
      </form>
    </div>
  );
};

export default Messagesection;
