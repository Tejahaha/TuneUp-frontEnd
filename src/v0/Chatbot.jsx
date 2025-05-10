import React, { useState } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      // Simulate a bot response
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, { text: 'This is a bot response.', sender: 'bot' }]);
      }, 1000);
    }
  };

  return (
    <div className="chatbot">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>{msg.text}</div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

// Add some basic styles
const styles = `
.chatbot {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  max-width: 400px;
  margin: 0 auto;
}
.messages {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 16px;
}
.message {
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 8px;
}
.message.user {
  background-color: #e0f7fa;
  text-align: right;
}
.message.bot {
  background-color: #f1f8e9;
  text-align: left;
}
.input-area {
  display: flex;
}
.input-area input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.input-area button {
  padding: 8px 16px;
  margin-left: 8px;
  border: none;
  background-color: #00796b;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
.input-area button:hover {
  background-color: #004d40;
}
`;

// Inject styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);