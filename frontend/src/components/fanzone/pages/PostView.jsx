// src/components/fanzone/pages/PostView.jsx

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUp, ArrowDown, Trash2 } from "lucide-react";

import CommentBox from "../components/CommentBox";
import { useFanZone } from "../context/FanZoneContext";

const CURRENT_USER = "Ergis";

export default function PostView() {

  const { id } = useParams();
  const {
    posts,
    upvote,
    downvote,
    addComment,
    deleteComment
  } = useFanZone();

  // id from URL is a string; post.id may be a number
  const post = posts.find(
    (p) => String(p.id) === String(id)
  );

  const [imageError, setImageError] = useState(false);

  if (!post) {
    return (
      <div className="post-not-found">
        <h2>Post not found</h2>
        <p>This post may have been deleted or the link is invalid.</p>
        <Link to="/fanzone" className="back-link">
          <ArrowLeft size={16} />
          Back to Feed
        </Link>
      </div>
    );
  }

  const voteColor =
    post.userVote === "up"
      ? "#ff4500"
      : post.userVote === "down"
      ? "#7193ff"
      : "white";

  return (
    <div className="post-view-wrapper">

      {/* ── BACK ── */}
      <Link to="/fanzone" className="back-link">
        <ArrowLeft size={16} />
        Back to Feed
      </Link>

      {/* ── POST ── */}
      <div className="single-post-card">

        <div className="single-post-inner">

          {/* Vote column */}
          <div className="vote-column">
            <button
              onClick={() => upvote(post.id)}
              className={post.userVote === "up" ? "vote-active-up" : ""}
              title="Upvote"
            >
              <ArrowUp size={20} />
            </button>
            <span style={{ color: voteColor, fontWeight: 700 }}>
              {post.votes}
            </span>
            <button
              onClick={() => downvote(post.id)}
              className={post.userVote === "down" ? "vote-active-down" : ""}
              title="Downvote"
            >
              <ArrowDown size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="single-post-content">

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

            <h1 className="post-title">{post.title}</h1>

            {post.text && (
              <p className="post-text">{post.text}</p>
            )}

            {post.image && !imageError && (
              <img
                src={post.image}
                alt={post.title}
                className="post-image"
                onError={() => setImageError(true)}
              />
            )}

          </div>

        </div>

      </div>

      {/* ── COMMENT BOX ── */}
      <CommentBox
        onAdd={(comment) => addComment(post.id, comment)}
      />

      {/* ── COMMENTS ── */}
      <div className="comments-section">

        <h3 className="comments-heading">
          {post.comments.length} Comment
          {post.comments.length !== 1 ? "s" : ""}
        </h3>

        {post.comments.length === 0 ? (
          <p className="no-comments">
            No comments yet. Be the first!
          </p>
        ) : (
          [...post.comments].reverse().map((comment) => (
            <div key={comment.id} className="comment">

              <img
                src={
                  comment.avatar ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user}`
                }
                alt={comment.user}
                className="comment-avatar"
              />

              <div className="comment-body">
                <div className="comment-header">
                  <span className="comment-user">
                    u/{comment.user}
                  </span>
                  <span className="comment-time">
                    {comment.time}
                  </span>
                </div>

                <p className="comment-text">
                  {comment.text}
                </p>
              </div>

              {/* Delete — only for comment owner */}
              {comment.user === CURRENT_USER && (
                <button
                  className="action-btn delete-btn"
                  onClick={() =>
                    deleteComment(post.id, comment.id)
                  }
                  title="Delete comment"
                >
                  <Trash2 size={16} />
                </button>
              )}

            </div>
          ))
        )}

      </div>

    </div>
  );
}
