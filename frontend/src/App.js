// src/App.js
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation
} from "react-router-dom";

import Home from "./Home";
import LiveCinema from "./LiveCinema";
import Banner from "./components/Banner";

/* =========================
   FANZONE
========================= */
import FanZone from "./components/fanzone/FanZone";

/* =========================
   STYLES
========================= */
import "./App.css";

/* =========================
   TEMP TOKEN
========================= */
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
const featuredPollId = "69f127cbe0fd27f14c440fd7";

function AppContent({ bannerFinished, setBannerFinished }) {
  const location = useLocation();
  const isFanZone = location.pathname.startsWith("/fanzone");

  /* =========================
     NAVBAR SCROLL EFFECT
  ========================= */
  useEffect(() => {
    let lastScrollTop = 0;
    const nav = document.querySelector(".top-nav");

    const onScroll = () => {
      if (!nav) return;
      let scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      nav.style.top = scrollTop > lastScrollTop ? "-80px" : "20px";
      lastScrollTop = scrollTop;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="App">
      {/* Banner */}
      {!bannerFinished && (
        <Banner onFinish={() => setBannerFinished(true)} />
      )}

      {/* Global Navbar (hidden inside FanZone) */}
      {!isFanZone && (
        <nav className="top-nav fade-in">
          <Link to="/" className="nav-button">MainStudio</Link>
          <Link to="/fanzone" className="nav-button">FanZone</Link>
          <Link to="/livecinema" className="nav-button">LiveCinema</Link>
        </nav>
      )}

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              featuredPollId={featuredPollId}
              token={token}
              bannerFinished={bannerFinished}
            />
          }
        />

        {/* FanZone */}
        <Route path="/fanzone/*" element={<FanZone />} />

        {/* LiveCinema */}
        <Route path="/livecinema" element={<LiveCinema />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  const [bannerFinished, setBannerFinished] = useState(false);

  return (
    <Router>
      <AppContent
        bannerFinished={bannerFinished}
        setBannerFinished={setBannerFinished}
      />
    </Router>
  );
}

export default App;
