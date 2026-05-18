// src/components/fanzone/components/PostCard.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUp,
  ArrowDown,
  MessageCircle,
  Share2,
  Bookmark,
  Trash2
} from "lucide-react";

import { useFanZone } from "../context/FanZoneContext";

const CURRENT_USER = "Ergis";

export default function PostCard({ post }) {

  const { upvote, downvote, deletePost } = useFanZone();

  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleShare() {
    navigator.clipboard
      .writeText(`${window.location.origin}/fanzone/post/${post.id}`)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  }

  const voteColor =
    post.userVote === "up"
      ? "#ff4500"
      : post.userVote === "down"
      ? "#7193ff"
      : "white";

  return (
    <div className="reddit-post-card">

      {/* ── VOTE COLUMN ── */}
      <div className="vote-column">

        <button
          onClick={() => upvote(post.id)}
          className={post.userVote === "up" ? "vote-active-up" : ""}
          title="Upvote"
          aria-label="Upvote"
        >
          <ArrowUp size={20} />
        </button>

        <span style={{ color: voteColor }}>
          {post.votes}
        </span>

        <button
          onClick={() => downvote(post.id)}
          className={post.userVote === "down" ? "vote-active-down" : ""}
          title="Downvote"
          aria-label="Downvote"
        >
          <ArrowDown size={20} />
        </button>

      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="post-main">

        {/* Meta */}
        <div className="post-meta">
          <img
            src={
              post.avatar ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.user}`
            }
            alt={post.user}
            className="post-avatar"
          />
          <div className="meta-top">
            <span className="community-name">r/FanZone</span>
            <span className="dot">•</span>
            <span className="post-user">Posted by u/{post.user}</span>
            <span className="dot">•</span>
            <span className="post-time">{post.time}</span>
          </div>
        </div>

        {/* Title */}
        <Link
          to={`/fanzone/post/${post.id}`}
          className="post-title-link"
        >
          <h2 className="post-title">{post.title}</h2>
        </Link>

        {/* Text */}
        {post.text && (
          <p className="post-text">{post.text}</p>
        )}

        {/* Image */}
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="post-image"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        )}

        {/* Actions */}
        <div className="post-actions">

          <Link
            to={`/fanzone/post/${post.id}`}
            className="action-btn"
            title="View comments"
          >
            <MessageCircle size={18} />
            <span>{post.comments.length} Comments</span>
          </Link>

          <button
            className="action-btn"
            onClick={handleShare}
            title="Copy link"
          >
            <Share2 size={18} />
            <span>{copied ? "Copied!" : "Share"}</span>
          </button>

          <button
            className={`action-btn ${bookmarked ? "bookmarked" : ""}`}
            onClick={() => setBookmarked((b) => !b)}
            title={bookmarked ? "Remove bookmark" : "Bookmark"}
          >
            <Bookmark
              size={18}
              fill={bookmarked ? "#ff4500" : "none"}
            />
            <span>{bookmarked ? "Saved" : "Save"}</span>
          </button>

          {/* Delete — only visible to post author */}
          {post.user === CURRENT_USER && (
            <button
              className="action-btn delete-btn"
              onClick={() => deletePost(post.id)}
              title="Delete post"
            >
              <Trash2 size={18} />
              <span>Delete</span>
            </button>
          )}

        </div>

      </div>

    </div>
  );
}
