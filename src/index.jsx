import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

function App() {
  const [messages, setMessages] = useState([
    { id: 1, text: '你好，有什么我可以帮忙的吗？', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: input.trim(), sender: 'user' },
    ]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: `你说的是: ${input.trim()}`, sender: 'bot' },
      ]);
    }, 500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div id="chatbox">
      <div id="messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div id="input-area">
        <input
          type="text"
          placeholder="输入你的消息..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage} disabled={!input.trim()}>
          发送
        </button>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
