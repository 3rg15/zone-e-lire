import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Vote,
  TrendingUp,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import "./Poll.css";

function Poll({ pollId, token }) {
  const [poll, setPoll] = useState(null);
  const [selected, setSelected] = useState(null);
  const [loadingVote, setLoadingVote] = useState(false);

  useEffect(() => {
    fetchPoll();
  }, [pollId]);

  const fetchPoll = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/polls/${pollId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPoll(res.data);
    } catch (err) {
      console.error("Poll fetch error:", err);
    }
  };

  const handleVote = async (optionIndex) => {
    if (loadingVote || selected !== null) return;

    try {
      setLoadingVote(true);

      await axios.post(
        `http://localhost:5000/api/polls/${pollId}/vote`,
        { optionIndex },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSelected(optionIndex);

      await fetchPoll();
    } catch (err) {
      console.error("Vote error:", err);
    } finally {
      setLoadingVote(false);
    }
  };

  if (!poll) {
    return (
      <div className="poll-loading">
        <div className="loader-ring"></div>
        <p>Loading poll...</p>
      </div>
    );
  }

  const totalVotes = poll.options.reduce(
    (sum, opt) => sum + opt.votes,
    0
  );

  return (
    <div className="poll-container">
      {/* HEADER */}
      <div className="poll-header">
        <div className="poll-badge">
          <Sparkles size={14} />
          LIVE POLL
        </div>

        <h2 className="poll-question">
          {poll.question}
        </h2>

        <p className="poll-total-votes">
          <Vote size={16} />
          {totalVotes} total votes
        </p>
      </div>

      {/* OPTIONS */}
      <div className="poll-options">
        {poll.options.map((opt, idx) => {
          const percent = totalVotes
            ? ((opt.votes / totalVotes) * 100).toFixed(1)
            : 0;

          const isSelected = selected === idx;

          return (
            <div
              key={opt._id}
              className={`poll-option ${
                isSelected ? "poll-option-selected" : ""
              }`}
            >
              {/* TOP */}
              <div className="poll-option-top">
                <div>
                  <h3>{opt.text}</h3>

                  <span>
                    {opt.votes} votes
                  </span>
                </div>

                <div className="poll-percent">
                  <TrendingUp size={14} />
                  {percent}%
                </div>
              </div>

              {/* PROGRESS */}
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${percent}%`,
                  }}
                ></div>
              </div>

              {/* BUTTON */}
              <button
                onClick={() => handleVote(idx)}
                className={`vote-button ${
                  isSelected ? "voted-btn" : ""
                }`}
                disabled={
                  loadingVote ||
                  selected !== null
                }
              >
                {isSelected ? (
                  <>
                    <CheckCircle2 size={16} />
                    Voted
                  </>
                ) : (
                  <>
                    <Vote size={16} />
                    Vote Now
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Poll;