// src/components/fanzone/context/FanZoneContext.jsx

import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const FanZoneContext = createContext();

const DEFAULT_POSTS = [
  {
    id: 1,
    user: "Ergis",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ergis",
    time: "2 hours ago",
    title: "Welcome to FanZone 🔥",
    text: "This is your first Reddit-style post. Share your thoughts, images, and more!",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
    votes: 124,
    userVote: null, // null | "up" | "down"
    comments: [
      {
        id: 1,
        user: "SportsFan99",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SportsFan99",
        text: "Great first post! Welcome everyone!",
        time: "1 hour ago"
      }
    ]
  },
  {
    id: 2,
    user: "Alex",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    time: "5 hours ago",
    title: "Best Goals of the Season ⚽",
    text: "What do you think were the best goals scored this season? Drop your favorites below!",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800",
    votes: 89,
    userVote: null,
    comments: []
  }
];

function loadPosts() {
  try {
    const saved = localStorage.getItem("fanzone-posts");
    return saved ? JSON.parse(saved) : DEFAULT_POSTS;
  } catch {
    return DEFAULT_POSTS;
  }
}

export function FanZoneProvider({ children }) {

  const [posts, setPosts] = useState(loadPosts);

  // Persist to localStorage whenever posts change
  useEffect(() => {
    try {
      localStorage.setItem("fanzone-posts", JSON.stringify(posts));
    } catch (err) {
      console.error("Failed to save posts:", err);
    }
  }, [posts]);

  /* ── CREATE POST ── */
  function createPost(post) {
    setPosts((prev) => [post, ...prev]);
  }

  /* ── DELETE POST ── */
  function deletePost(id) {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  /* ── UPVOTE (toggle) ── */
  function upvote(id) {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;

        if (p.userVote === "up") {
          // Cancel upvote
          return { ...p, votes: p.votes - 1, userVote: null };
        }

        if (p.userVote === "down") {
          // Switch from downvote to upvote
          return { ...p, votes: p.votes + 2, userVote: "up" };
        }

        // Fresh upvote
        return { ...p, votes: p.votes + 1, userVote: "up" };
      })
    );
  }

  /* ── DOWNVOTE (toggle) ── */
  function downvote(id) {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;

        if (p.userVote === "down") {
          // Cancel downvote
          return { ...p, votes: p.votes + 1, userVote: null };
        }

        if (p.userVote === "up") {
          // Switch from upvote to downvote
          return { ...p, votes: p.votes - 2, userVote: "down" };
        }

        // Fresh downvote
        return { ...p, votes: p.votes - 1, userVote: "down" };
      })
    );
  }

  /* ── ADD COMMENT ── */
  function addComment(postId, comment) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, comments: [...p.comments, comment] }
          : p
      )
    );
  }

  /* ── DELETE COMMENT ── */
  function deleteComment(postId, commentId) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: p.comments.filter((c) => c.id !== commentId)
            }
          : p
      )
    );
  }

  return (
    <FanZoneContext.Provider
      value={{
        posts,
        createPost,
        deletePost,
        upvote,
        downvote,
        addComment,
        deleteComment
      }}
    >
      {children}
    </FanZoneContext.Provider>
  );
}

export function useFanZone() {
  const context = useContext(FanZoneContext);
  if (!context) {
    throw new Error("useFanZone must be used inside FanZoneProvider");
  }
  return context;
}
