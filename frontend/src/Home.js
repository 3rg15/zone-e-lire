// src/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Flame,
  PlayCircle,
  Users,
  ArrowRight,
  Radio,
} from "lucide-react";

import GalaxyBackground from "./components/GalaxyBackground";
import PollCard from "./components/PollCard";

import "./Home.css";

import card1 from "./assets/polls/1.svg";
import card2 from "./assets/polls/2.svg";
import card3 from "./assets/polls/3.svg";
import arianImage from "./assets/arian.png";

function Home() {
  const navigate = useNavigate();

  const handleVote = (member) => {
    console.log(`Voted for ${member}`);
  };

  const trendingTopics = [
    "Debati i Javës",
    "Top Votuarit",
    "LiveCinema Moments",
    "Sugjerimet e Fansave",
  ];

  return (
    <div className="home-container">
      <GalaxyBackground />

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">
          <Radio size={16} />
          LIVE COMMUNITY PLATFORM
        </div>

        <h1 className="hero-title">
          Mirë se erdhët në
          <span className="gradient-text"> MainStudio</span>
        </h1>

        <p className="hero-subtitle">
          Hapësira juaj për të zgjedhur, për t’u lidhur dhe për të
          jetuar debatet pa filtra.
        </p>

        <div className="hero-buttons">
          <button
            className="cta-button"
            onClick={() => navigate("/fanzone")}
          >
            Eksploro FanZone
            <ArrowRight size={18} />
          </button>

          <button
            className="secondary-button"
            onClick={() => navigate("/livecinema")}
          >
            <PlayCircle size={18} />
            Shiko Klipet
          </button>
        </div>

        {/* STATS */}
        <div className="hero-stats">
          <div className="stat-card">
            <Users size={20} />
            <div>
              <h3>24K+</h3>
              <p>Fans Aktivë</p>
            </div>
          </div>

          <div className="stat-card">
            <Flame size={20} />
            <div>
              <h3>120+</h3>
              <p>Debate Live</p>
            </div>
          </div>

          <div className="stat-card">
            <Sparkles size={20} />
            <div>
              <h3>∞</h3>
              <p>Momente Virale</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED HOST */}
      <section className="intro">
        <div className="intro-image-wrapper">
          <img
            src={arianImage}
            alt="Arian Cani"
            className="arian-large"
          />

          <div className="image-glow"></div>
        </div>

        <div className="intro-content">
          <div className="section-label">
            <Sparkles size={16} />
            HOST I JAVËS
          </div>

          <h2 className="intro-title">
            Arian Çani rikthen debatet më intensive
          </h2>

          <p className="intro-text">
            Çdo javë, MainStudio sjell personazhet më të komentuar,
            debatet më të forta dhe momentet që pushtojnë rrjetin.
            Bëhu pjesë e komunitetit dhe voto të preferuarin tënd.
          </p>

          <button
            className="intro-btn"
            onClick={() => navigate("/fanzone")}
          >
            Bashkohu Tani
          </button>
        </div>
      </section>

      {/* POLLS */}
      <section className="featured-poll">
        <div className="section-header">
          <div>
            <div className="section-label">
              <Flame size={16} />
              TRENDING NOW
            </div>

            <h2>Zgjidhni të preferuarin tuaj</h2>
          </div>

          <button
            className="view-all-btn"
            onClick={() => navigate("/polls")}
          >
            Shiko të gjitha
          </button>
        </div>

        <div className="poll-cards">
          <PollCard
            image={card1}
            onVote={() => handleVote("Member A")}
          />

          <PollCard
            image={card2}
            onVote={() => handleVote("Member B")}
          />

          <PollCard
            image={card3}
            onVote={() => handleVote("Member C")}
          />
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="highlights">
        <div className="section-header">
          <div>
            <div className="section-label">
              <PlayCircle size={16} />
              HIGHLIGHTS
            </div>

            <h2>Debatet & Klipet Kryesore</h2>
          </div>
        </div>

        <div className="highlights-grid">
          {trendingTopics.map((topic, index) => (
            <div className="highlight-card" key={index}>
              <div className="highlight-overlay"></div>

              <div className="highlight-content">
                <span className="highlight-number">
                  0{index + 1}
                </span>

                <h3>{topic}</h3>

                <button className="watch-btn">
                  <PlayCircle size={16} />
                  Shiko
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMMUNITY CTA */}
      <section className="community-cta">
        <div className="community-card">
          <div className="community-glow"></div>

          <h2>Bëhu pjesë e komunitetit MainStudio</h2>

          <p>
            Diskuto, voto, komento dhe lidhu me fansat më aktivë
            shqiptarë.
          </p>

          <button
            className="community-btn"
            onClick={() => navigate("/fanzone")}
          >
            Hyr në FanZone
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-left">
          <h3>MainStudio</h3>
          <p>
            Platforma shqiptare për debate, komunitet dhe entertainment.
          </p>
        </div>

        <div className="social-links">
          <a href="/">YouTube</a>
          <a href="/">Instagram</a>
          <a href="/">TikTok</a>
        </div>
      </footer>
    </div>
  );
}

export default Home;