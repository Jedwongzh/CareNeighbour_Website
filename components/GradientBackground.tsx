"use client";

import React from "react";

export default function GradientBackground() {
  return (
    <>
      <div className="gradient-bg">
        <svg>
          <filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur"/><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"/><feBlend in="SourceGraphic" in2="goo" /></filter>
        </svg>
        <div className="gradients-container">
          <div className="g1" />
          <div className="g2" />
          <div className="g3" />
          <div className="g4" />
          <div className="g5" />
        </div>
      </div>
      <style jsx global>{`
        :root {
          --color-bg1: rgb(229, 217, 242);
          --color-bg2: rgb(165, 148, 249);
          --color1: 148, 171, 249;
          --color2:165, 148, 249;
          --color3:148, 244, 249;
          --color4: 236, 118, 140;
          --color5: 238, 243, 105;
          --color-interactive: 251, 253, 255;
          --circle-size: 80%;
          --blending: hard-light;
        }
        .gradient-bg {
          width: 100vw;
          height: 100vh;
          position: fixed;
          overflow: hidden;
          background: linear-gradient(40deg, var(--color-bg1), var(--color-bg2));
          top: 0;
          left: 0;
          z-index: -1;
        }
        .gradient-bg svg {
          position: fixed;
          top:0;
          left:0;
          width: 0;
          height: 0;
        }
        .gradients-container {
          filter: url(#goo) blur(40px);
          width: 100vw;
          height: 100vh;
        }
        .g1 {
          position: absolute;
          background: radial-gradient(circle at center, rgba(var(--color1), 0.4) 0, rgba(var(--color1), 0) 50%) no-repeat;
          mix-blend-mode: var(--blending);
          width: var(--circle-size);
          height: var(--circle-size);
          top: calc(50% - var(--circle-size) / 2);
          left: calc(50% - var(--circle-size) / 2);
          transform-origin: center center;
          animation: moveVertical 30s ease infinite;
          opacity: 1;
        }
        .g2 {
          position: absolute;
          background: radial-gradient(circle at center, rgba(var(--color2), 0.4) 0, rgba(var(--color2), 0) 50%) no-repeat;
          mix-blend-mode: var(--blending);
          width: var(--circle-size);
          height: var(--circle-size);
          top: calc(50% - var(--circle-size) / 2);
          left: calc(50% - var(--circle-size) / 2);
          transform-origin: calc(50% - 400px);
          animation: moveInCircle 20s reverse infinite;
          opacity: 1;
        }
        .g3 {
          position: absolute;
          background: radial-gradient(circle at center, rgba(var(--color3), 0.4) 0, rgba(var(--color3), 0) 50%) no-repeat;
          mix-blend-mode: var(--blending);
          width: var(--circle-size);
          height: var(--circle-size);
          top: calc(50% - var(--circle-size) / 2 + 200px);
          left: calc(50% - var(--circle-size) / 2 - 500px);
          transform-origin: calc(50% + 400px);
          animation: moveInCircle 40s linear infinite;
          opacity: 1;
        }
        .g4 {
          position: absolute;
          background: radial-gradient(circle at center, rgba(var(--color4), 0.3) 0, rgba(var(--color4), 0) 50%) no-repeat;
          mix-blend-mode: var(--blending);
          width: var(--circle-size);
          height: var(--circle-size);
          top: calc(50% - var(--circle-size) / 2);
          left: calc(50% - var(--circle-size) / 2);
          transform-origin: calc(50% - 200px);
          animation: moveHorizontal 40s ease infinite;
          opacity: 0.7;
        }
        .g5 {
          position: absolute;
          background: radial-gradient(circle at center, rgba(var(--color5), 0.3) 0, rgba(var(--color5), 0) 50%) no-repeat;
          mix-blend-mode: var(--blending);
          width: calc(var(--circle-size) * 2);
          height: calc(var(--circle-size) * 2);
          top: calc(50% - var(--circle-size));
          left: calc(50% - var(--circle-size));
          transform-origin: calc(50% - 800px) calc(50% + 200px);
          animation: moveInCircle 20s ease infinite;
          opacity: 1;
        }
        @keyframes moveInCircle {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(180deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes moveVertical {
          0% { transform: translateY(-50%); }
          50% { transform: translateY(50%); }
          100% { transform: translateY(-50%); }
        }
        @keyframes moveHorizontal {
          0% { transform: translateX(-50%) translateY(-10%); }
          50% { transform: translateX(50%) translateY(10%); }
          100% { transform: translateX(-50%) translateY(-10%); }
        }
      `}</style>
    </>
  );
}