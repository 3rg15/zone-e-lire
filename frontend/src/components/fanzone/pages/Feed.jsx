// src/components/fanzone/pages/Feed.jsx

import { useState } from "react";
import { ImageIcon, X } from "lucide-react";

import PostCard from "../components/PostCard";
import { useFanZone } from "../context/FanZoneContext";

const CURRENT_USER = "Ergis";

const SORT_OPTIONS = [
  { value: "new", label: "🆕 New" },
  { value: "top", label: "🔥 Top" },
  { value: "hot", label: "⚡ Hot" }
];

export default function Feed() {

  const { posts, createPost } = useFanZone();

  // Form state
  const [title, setTitle]   = useState("");
  const [text, setText]     = useState("");
  const [image, setImage]   = useState("");
  const [errors, setErrors] = useState({});

  // UI state
  const [search, setSearch]     = useState("");
  const [sort, setSort]         = useState("new");
  const [showForm, setShowForm] = useState(false);
  const [imagePreviewOk, setImagePreviewOk] = useState(true);

  /* ── VALIDATION ── */
  function validate() {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required.";
    } else if (title.trim().length > 200) {
      newErrors.title = "Title must be under 200 characters.";
    }

    if (!text.trim()) {
      newErrors.text = "Post content is required.";
    } else if (text.trim().length > 2000) {
      newErrors.text = "Content must be under 2000 characters.";
    }

    if (image && !/^https?:\/\/.+/.test(image.trim())) {
      newErrors.image = "Please enter a valid URL starting with http(s)://";
    }

    return newErrors;
  }

  /* ── CREATE POST ── */
  function handleCreatePost(e) {
    e.preventDefault();

    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newPost = {
      id: Date.now(),
      user: CURRENT_USER,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${CURRENT_USER}`,
      time: "Just now",
      title: title.trim(),
      text: text.trim(),
      image: image.trim(),
      votes: 0,
      userVote: null,
      comments: []
    };

    createPost(newPost);

    // Reset
    setTitle("");
    setText("");
    setImage("");
    setErrors({});
    setShowForm(false);
  }

  /* ── SORT ── */
  function getSortedPosts(list) {
    switch (sort) {
      case "top":
        return [...list].sort((a, b) => b.votes - a.votes);
      case "hot":
        return [...list].sort(
          (a, b) =>
            b.votes + b.comments.length - (a.votes + a.comments.length)
        );
      case "new":
      default:
        return [...list];
    }
  }

  /* ── FILTER ── */
  const filteredPosts = getSortedPosts(
    posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.text.toLowerCase().includes(search.toLowerCase()) ||
        post.user.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="feed-wrapper">

      {/* ── CREATE POST TRIGGER ── */}
      <div className="create-post-trigger">
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${CURRENT_USER}`}
          alt={CURRENT_USER}
          className="create-trigger-avatar"
        />
        <button
          className="create-trigger-btn"
          onClick={() => setShowForm((v) => !v)}
        >
          {showForm ? "Cancel" : "Create a post..."}
        </button>
        <button
          className="create-image-btn"
          title="Add image"
          onClick={() => setShowForm(true)}
        >
          <ImageIcon size={20} />
        </button>
      </div>

      {/* ── CREATE POST FORM ── */}
      {showForm && (
        <div className="create-post-card">

          <div className="create-post-header">
            <h3>Create Post</h3>
            <button
              className="close-form-btn"
              onClick={() => {
                setShowForm(false);
                setErrors({});
              }}
              aria-label="Close form"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleCreatePost} noValidate>

            {/* Title */}
            <div className="form-group">
              <input
                type="text"
                placeholder="Post title *"
                value={title}
                maxLength={200}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) {
                    setErrors((prev) => ({ ...prev, title: "" }));
                  }
                }}
                className={`post-input ${errors.title ? "input-error" : ""}`}
              />
              {errors.title && (
                <p className="field-error">{errors.title}</p>
              )}
              <span className="char-hint">
                {title.length}/200
              </span>
            </div>

            {/* Text */}
            <div className="form-group">
              <textarea
                placeholder="Share something... *"
                value={text}
                maxLength={2000}
                rows={4}
                onChange={(e) => {
                  setText(e.target.value);
                  if (errors.text) {
                    setErrors((prev) => ({ ...prev, text: "" }));
                  }
                }}
                className={errors.text ? "input-error" : ""}
              />
              {errors.text && (
                <p className="field-error">{errors.text}</p>
              )}
              <span className="char-hint">
                {text.length}/2000
              </span>
            </div>

            {/* Image URL */}
            <div className="form-group">
              <input
                type="url"
                placeholder="Image URL (optional)"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                  setImagePreviewOk(true);
                  if (errors.image) {
                    setErrors((prev) => ({ ...prev, image: "" }));
                  }
                }}
                className={`post-input ${errors.image ? "input-error" : ""}`}
              />
              {errors.image && (
                <p className="field-error">{errors.image}</p>
              )}
            </div>

            {/* Image preview */}
            {image && imagePreviewOk && (
              <div className="image-preview-wrapper">
                <img
                  src={image}
                  alt="preview"
                  className="image-preview"
                  onError={() => setImagePreviewOk(false)}
                />
              </div>
            )}

            <button type="submit" className="post-btn">
              Post
            </button>

          </form>

        </div>
      )}

      {/* ── SEARCH + SORT ── */}
      <div className="feed-controls">
        <input
          type="text"
          placeholder="🔍 Search posts..."
          className="search-posts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="sort-buttons">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={`sort-btn ${sort === opt.value ? "sort-active" : ""}`}
              onClick={() => setSort(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── POSTS ── */}
      {filteredPosts.length === 0 ? (
        <div className="no-posts">
          <p>
            {search
              ? `No posts found for "${search}"`
              : "No posts yet. Be the first to post!"}
          </p>
        </div>
      ) : (
        filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))
      )}

    </div>
  );
}
