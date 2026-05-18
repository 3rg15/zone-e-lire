import React, { useMemo, useState } from "react";
import {
  Heart,
  Sparkles,
  TrendingUp,
  Check,
} from "lucide-react";

import "./PollCard.css";

const PollCard = ({
  image,
  name = "MainStudio Guest",
  role = "Special Guest",
  votes: initialVotes = 0,
  totalVotes: initialTotal = 100,
  glow = "cyan",
  onVote,
}) => {
  const [votes, setVotes] = useState(initialVotes);
  const [totalVotes, setTotalVotes] = useState(initialTotal);
  const [voted, setVoted] = useState(false);

  const percentage = useMemo(() => {
    if (totalVotes <= 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  }, [votes, totalVotes]);

  const handleVote = () => {
    if (voted) return;

    const updatedVotes = votes + 1;
    const updatedTotal = totalVotes + 1;

    setVotes(updatedVotes);
    setTotalVotes(updatedTotal);
    setVoted(true);

    if (onVote) {
      onVote(updatedVotes, updatedTotal);
    }
  };

  return (
    <div
      className={`poll-card ${
        glow === "magenta"
          ? "poll-card-magenta"
          : "poll-card-cyan"
      }`}
    >
      {/* IMAGE */}
      <div className="poll-image-wrapper">
        <img
          src={image}
          alt={name}
          className="poll-image"
        />

        <div className="poll-image-overlay"></div>

        {/* TOP BADGE */}
        <div className="poll-top-badge">
          <Sparkles size={14} />
          TRENDING
        </div>

        {/* FLOATING % */}
        <div className="poll-floating-score">
          <TrendingUp size={14} />
          {percentage}%
        </div>
      </div>

      {/* CONTENT */}
      <div className="poll-content">
        <div className="poll-meta">
          <span className="poll-role">{role}</span>

          <h3 className="poll-name">{name}</h3>
        </div>

        {/* BAR */}
        <div className="poll-progress-wrapper">
          <div className="poll-progress-bar">
            <div
              className="poll-progress-fill"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="poll-stats">
            <span>{votes} votes</span>
            <span>{percentage}% support</span>
          </div>
        </div>

        {/* BUTTON */}
        <button
          className={`poll-vote-btn ${
            voted ? "poll-voted" : ""
          }`}
          onClick={handleVote}
          disabled={voted}
        >
          {voted ? (
            <>
              <Check size={16} />
              Voted
            </>
          ) : (
            <>
              <Heart size={16} />
              Vote Now
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PollCard;