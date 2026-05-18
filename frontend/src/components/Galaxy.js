// src/components/Galaxy.js
import React, { useRef, useEffect } from "react";

const Galaxy = ({ starCount = 600, speed = 4 }) => {
  const canvasRef = useRef(null);
  const stars = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize stars with 3D positions
    stars.current = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * canvas.width,
      y: (Math.random() - 0.5) * canvas.height,
      z: Math.random() * canvas.width,
    }));

    function animate() {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let star of stars.current) {
        star.z -= speed; // move forward

        if (star.z <= 0) {
          // reset star far away
          star.x = (Math.random() - 0.5) * canvas.width;
          star.y = (Math.random() - 0.5) * canvas.height;
          star.z = canvas.width;
        }

        // perspective projection
        const scale = 200 / star.z;
        const x = star.x * scale + canvas.width / 2;
        const y = star.y * scale + canvas.height / 2;

        // draw star
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(x, y, scale * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    }

    animate();
  }, [starCount, speed]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{ display: "block", background: "black" }}
    />
  );
};

export default Galaxy;
