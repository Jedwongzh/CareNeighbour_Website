"use client";

import React, { memo } from "react";

// Memoize the component to prevent unnecessary re-renders
const GradientBackground = memo(() => {
  return (
    <div className="gradient-bg">
      <svg style={{ position: 'fixed', top: 0, left: 0, width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur"/>
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" 
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className="gradients-container">
        <div className="g1" />
        <div className="g2" />
        <div className="g3" />
        <div className="g4" />
        <div className="g5" />
      </div>
    </div>
  );
});

GradientBackground.displayName = 'GradientBackground';

export default GradientBackground;