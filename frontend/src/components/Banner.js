// src/components/Banner.js
import React, { useEffect, useState } from "react";
import bannerVideo from "../assets/banner.mp4";
import "./Banner.css";

function Banner({ onFinish }) {
  const [visible, setVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Hide after 5s
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleTransitionEnd = () => {
    if (!visible) {
      setShouldRender(false);
      if (onFinish) onFinish();
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`banner-container ${visible ? "show" : "hide"}`}
      onTransitionEnd={handleTransitionEnd}
    >
      <video
        src={bannerVideo}
        autoPlay
        muted
        playsInline
        className="banner-video"
      />
    </div>
  );
}

export default Banner;
