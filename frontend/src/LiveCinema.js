// src/components/LiveCinema.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  MessageCircle,
  Send,
  Radio,
  Sparkles,
} from "lucide-react";

import "./LiveCinema.css";

function LiveCinema() {
  const [messages, setMessages] = useState([
    { user: "User1", text: "This episode is hilarious!" },
    { user: "User2", text: "Guest A is on fire 🔥" },
  ]);

  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { user: "You", text: input }]);
    setInput("");
  };

  return (
    <div className="livecinema-container">

  

      {/* HEADER */}
      <div className="livecinema-header">
        <div className="live-badge">
          <Radio size={14} />
          LIVE NOW
        </div>

        <h1 className="livecinema-title">
          <Sparkles size={22} />
          Live Cinema
        </h1>

        <p className="livecinema-subtitle">
          Watch Zone e Lirë live with fan reactions in real time
        </p>
      </div>

      {/* STREAM + CHAT WRAP */}
      <div className="livecinema-grid">

        {/* STREAM */}
        <section className="livestream">
          <iframe
            src="https://www.youtube.com/embed/YOUR_LIVE_VIDEO_ID"
            title="Zone e Lirë Livestream"
            allowFullScreen
          />
          <div className="stream-glow"></div>
        </section>

        {/* CHAT */}
        <section className="chat-panel">
          <div className="chat-header">
            <MessageCircle size={18} />
            Live Chat
          </div>

          <div className="chat-box">
            {messages.map((msg, idx) => (
              <div key={idx} className="chat-message">
                <strong>{msg.user}:</strong> {msg.text}
              </div>
            ))}
          </div>

          <form className="chat-form" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">
              <Send size={16} />
              Send
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default LiveCinema;
