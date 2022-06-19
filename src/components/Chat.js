import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

const myId = uuidv4();
const socket = io('http://localhost:8080', { transports : ['websocket'] });
socket.on('connect', () => console.log('[IO] Connected to server'));

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newMennsage = (message) => {
      setMessages([...messages, message]);
    }
    socket.on('chat.message', newMennsage);
    return () => {
      socket.off('chat.message', newMennsage);
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('chat.message', {
        id: myId,
        message,
      });
      setMessage('');
    }
  };

  return (
    <main className="container">
      <ul className="list">
        {messages.map((m, i) => (
          <li key={ `${m.id}-${i}` } className={`list__item list__item--${m.id === myId ? 'mine' : 'other'}`}>
            <span className={`message message--${m.id === myId ? 'mine' : 'other'}`}>
              {m.message}
            </span>
          </li>
        ))}
      </ul>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={({ target }) => setMessage(target.value)}
          className="form__field"
          placeholder="Digite sua mensagem"
        />
      </form>
    </main>
  );
}

export default Chat;
