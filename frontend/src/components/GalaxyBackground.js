// src/components/GalaxyBackground.js
import React, { useRef, useEffect } from "react";

const GalaxyBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const numStars = Math.floor(width * height / 3000);
    const stars = Array.from({ length: numStars }, () => ({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: Math.random() * width,
      prevX: null,
      prevY: null,
    }));

    function drawStars() {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, width, height);

      for (let star of stars) {
        star.z -= 4; // move forward

        if (star.z <= 0) {
          // reset far away
          star.x = (Math.random() - 0.5) * width;
          star.y = (Math.random() - 0.5) * height;
          star.z = width;
          star.prevX = null;
          star.prevY = null;
        }

        // perspective projection
        const scale = 200 / star.z;
        const x = star.x * scale + width / 2;
        const y = star.y * scale + height / 2;

        // draw gradient trail
        if (star.prevX !== null && star.prevY !== null) {
          const gradient = ctx.createLinearGradient(star.prevX, star.prevY, x, y);
          gradient.addColorStop(0, "#0ff"); // cyan start
          gradient.addColorStop(1, "#fff"); // white end

          ctx.strokeStyle = gradient;
          ctx.lineWidth = scale * 1.2;
          ctx.beginPath();
          ctx.moveTo(star.prevX, star.prevY);
          ctx.lineTo(x, y);
          ctx.stroke();
        }

        // update previous position
        star.prevX = x;
        star.prevY = y;
      }

      requestAnimationFrame(drawStars);
    }

    drawStars();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
};

export default GalaxyBackground;
