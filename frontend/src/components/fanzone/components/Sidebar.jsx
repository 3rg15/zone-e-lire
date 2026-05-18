// src/components/fanzone/components/Sidebar.jsx

import { Link } from "react-router-dom";
import {
  TrendingUp,
  Users,
  Star,
  Info,
  ChevronRight
} from "lucide-react";

import { useFanZone } from "../context/FanZoneContext";

const TRENDING_TOPICS = [
  { id: 1, tag: "#ChampionsLeague", posts: "2.4k posts" },
  { id: 2, tag: "#TransferWindow", posts: "1.8k posts" },
  { id: 3, tag: "#WorldCup2026", posts: "3.1k posts" },
  { id: 4, tag: "#FantasyFootball", posts: "980 posts" },
  { id: 5, tag: "#GoalOfTheWeek", posts: "756 posts" }
];

export default function Sidebar() {

  const { posts } = useFanZone();

  // Top 3 posts by vote count
  const topPosts = [...posts]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 3);

  return (
    <aside className="fanzone-sidebar">

      {/* ── PROFILE CARD ── */}
      <div className="sidebar-card profile-card">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ergis"
          alt="Ergis"
          className="profile-avatar"
        />
        <h3>Ergis</h3>
        <p style={{ color: "#9ca3af", fontSize: 13 }}>
          u/ergis · Fan since 2024
        </p>

        <div className="profile-stats">
          <div className="profile-stat">
            <span className="stat-number">{posts.length}</span>
            <span className="stat-label">Posts</span>
          </div>
          <div className="profile-stat">
            <span className="stat-number">
              {posts.reduce((acc, p) => acc + p.votes, 0)}
            </span>
            <span className="stat-label">Karma</span>
          </div>
          <div className="profile-stat">
            <span className="stat-number">
              {posts.reduce((acc, p) => acc + p.comments.length, 0)}
            </span>
            <span className="stat-label">Comments</span>
          </div>
        </div>
      </div>

      {/* ── TRENDING ── */}
      <div className="sidebar-card">
        <div className="sidebar-title">
          <TrendingUp size={18} color="#ff4500" />
          <h3>Trending Topics</h3>
        </div>

        <ul className="trending-list">
          {TRENDING_TOPICS.map((topic) => (
            <li key={topic.id} className="trending-item">
              <div>
                <p className="trending-tag">{topic.tag}</p>
                <p className="trending-posts">{topic.posts}</p>
              </div>
              <ChevronRight size={16} color="#9ca3af" />
            </li>
          ))}
        </ul>
      </div>

      {/* ── TOP POSTS ── */}
      {topPosts.length > 0 && (
        <div className="sidebar-card">
          <div className="sidebar-title">
            <Star size={18} color="#ff4500" />
            <h3>Top Posts</h3>
          </div>

          <ul className="top-posts-list">
            {topPosts.map((post) => (
              <li key={post.id} className="top-post-item">
                <Link
                  to={`/fanzone/post/${post.id}`}
                  className="top-post-link"
                >
                  <p className="top-post-title">{post.title}</p>
                  <span className="top-post-votes">
                    ▲ {post.votes}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── COMMUNITY INFO ── */}
      <div className="sidebar-card">
        <div className="sidebar-title">
          <Info size={18} color="#ff4500" />
          <h3>About FanZone</h3>
        </div>

        <p style={{ color: "#9ca3af", fontSize: 13, lineHeight: 1.6 }}>
          FanZone is your community for sports fans.
          Share posts, vote on content, and join the conversation!
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 14,
            color: "#9ca3af",
            fontSize: 13
          }}
        >
          <Users size={16} />
          <span>12,847 members</span>
        </div>
      </div>

    </aside>
  );
}
