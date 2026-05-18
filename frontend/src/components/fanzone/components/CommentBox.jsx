// src/components/fanzone/components/CommentBox.jsx

import { useState } from "react";
import { Send } from "lucide-react";

const CURRENT_USER = "Ergis";

export default function CommentBox({ onAdd }) {

  const [text, setText] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const trimmed = text.trim();

    if (!trimmed) {
      setError("Comment cannot be empty.");
      return;
    }

    if (trimmed.length > 500) {
      setError("Comment must be under 500 characters.");
      return;
    }

    const comment = {
      id: Date.now(),
      user: CURRENT_USER,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${CURRENT_USER}`,
      text: trimmed,
      time: "Just now"
    };

    onAdd(comment);
    setText("");
    setError("");
  }

  return (
    <form
      className="comment-box"
      onSubmit={handleSubmit}
    >
      <h3 className="comment-box-title">
        Leave a comment
      </h3>

      <div className="comment-input-row">
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${CURRENT_USER}`}
          alt={CURRENT_USER}
          className="comment-avatar"
        />

        <div className="comment-input-wrapper">
          <textarea
            placeholder="What are your thoughts?"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (error) setError("");
            }}
            className="comment-textarea"
            maxLength={500}
            rows={3}
          />

          {error && (
            <p className="comment-error">{error}</p>
          )}

          <div className="comment-footer">
            <span className="char-count">
              {text.length}/500
            </span>

            <button
              type="submit"
              className="comment-submit-btn"
              disabled={!text.trim()}
            >
              <Send size={16} />
              Comment
            </button>
          </div>
        </div>

      </div>
    </form>
  );
}
