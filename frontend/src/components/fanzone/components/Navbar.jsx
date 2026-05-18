// src/components/fanzone/components/Navbar.jsx

import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Bell,
  Plus,
  ChevronDown,
  Flame,
  Film,
  Home
} from "lucide-react";

const CURRENT_USER = "Ergis";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fanzone-navbar">

      {/* ── LEFT ── */}
      <div className="nav-left">
        <Link to="/fanzone" className="logo">
          <Flame size={28} style={{ marginRight: 6 }} />
          FanZone
        </Link>
      </div>

      {/* ── RIGHT ── */}
      <div className="nav-right">

        {/* Notifications */}
        <button
          className="nav-icon-btn"
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell size={20} />
        </button>

        {/* Create Post */}
        <Link to="/fanzone/upload" className="nav-create-btn">
          <Plus size={18} />
          <span>Create</span>
        </Link>

        {/* NEW: Navigate to LiveCinema */}
        <Link to="/livecinema" className="nav-button">
          <Film size={18} style={{ marginRight: 6 }} />
          LiveCinema
        </Link>

        {/* NEW: Navigate to MainStudio */}
        <Link to="/" className="nav-button">
          <Home size={18} style={{ marginRight: 6 }} />
          MainStudio
        </Link>

        {/* Profile dropdown */}
        <div className="nav-profile-wrapper">
          <button
            className="nav-profile"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label="Profile menu"
          >
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${CURRENT_USER}`}
              alt={CURRENT_USER}
            />
            <div>
              <h4>{CURRENT_USER}</h4>
              <span>u/{CURRENT_USER.toLowerCase()}</span>
            </div>
            <ChevronDown size={16} />
          </button>

          {menuOpen && (
            <div className="nav-dropdown">
              <Link
                to="/fanzone"
                className="dropdown-item"
                onClick={() => setMenuOpen(false)}
              >
                My Profile
              </Link>
              <Link
                to="/fanzone"
                className="dropdown-item"
                onClick={() => setMenuOpen(false)}
              >
                Settings
              </Link>
              <button
                className="dropdown-item dropdown-logout"
                onClick={() => setMenuOpen(false)}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
