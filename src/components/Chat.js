import React, { useState } from 'react';

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, {id: 1 ,message}]);
      setMessage('');
    }
  };

  return (
    <main className="container">
      <ul className="list">
        {messages.map((m) => (
          <li key={ m.id } className="list__item list__item--mine">
            <span className="message message--mine">
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
