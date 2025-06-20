import React, { useState, useEffect, useRef } from "react";

// Words in different languages
const words: Record<string, string[]> = {
  en: ["Culture", "Qualification", "Availabilities", "Price", "Trust"],
  zh: ["文化", "资格", "可用性", "价格", "信任"],
  // Add more languages as needed
};

const ITEM_HEIGHT_REM = 1;
const VISIBLE_COUNT = 6;
const CENTER_INDEX = Math.floor(VISIBLE_COUNT / 2);
const ITEM_COUNT = 5; // or words[language].length if always 5

export default function VerticalCarousel({ language = "en" }: { language?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [maxWidth, setMaxWidth] = useState<number | undefined>(undefined);
  const displayWords = (words[language as keyof typeof words] || words.en) as string[];

  useEffect(() => {
    if (measureRef.current) {
      setMaxWidth(measureRef.current.offsetWidth);
    }
  }, [language]);

  // Track the current rotation in degrees for infinite rotation
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Auto-rotate infinitely in the correct direction
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => prev - 1); // Decrement for correct direction
      setRotation((prev) => prev - 60);   // Negative for upward rotation
    }, 1800);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Keep activeIndex in sync with rotation
  useEffect(() => {
    if (activeIndex < 0) setActiveIndex(ITEM_COUNT - 1);
    if (activeIndex >= ITEM_COUNT) setActiveIndex(0);
  }, [activeIndex]);

  // Carousel window
  const getDisplayItems = () => {
    const display = [];
    for (let i = -CENTER_INDEX; i <= CENTER_INDEX; i++) {
      const idx = (activeIndex + i + ITEM_COUNT) % ITEM_COUNT;
      display.push({
        word: displayWords[idx],
        isActive: i === 0, // Center item is always highlighted
        key: idx + '-' + i
      });
    }
    return display;
  };
  const displayItems = getDisplayItems();

  // Animate the list so the center item stays fixed
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (listRef.current) {
      listRef.current.style.transition = 'transform 0.7s cubic-bezier(0.1, 0, 0.2, 1)';
      listRef.current.style.transform = `translateY(-${CENTER_INDEX * ITEM_HEIGHT_REM}rem)`;
    }
  }, [activeIndex]);

  const rotate = (dir: number) => {
    setActiveIndex((prev) => prev - dir); // Reverse direction for manual
    setRotation((prev) => prev - dir * 60);
  };

  return (
    <div style={{ background: "transparent", padding: "70px 0", font: "15px/20px Arial, sans-serif" }}>
      <div className="container" style={{ margin: "0 auto", width: 250, height: 100, position: "relative", perspective: 1000, transformStyle: "preserve-3d", overflow: "hidden" }}>
        <div
          className="carousel"
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            transformStyle: "preserve-3d",
            transition: "transform 1s",
            transform: `rotateX(${rotation}deg)` // Use rotation state for infinite spin
          }}
        >
          {/* Render carousel items using only the words array */}
          {displayWords.map((word, i) => (
            <div
              key={i}
              className={`item`}
              style={{
                display: "block",
                position: "absolute",
                background: "rgba(255,255,255,0.15)", // glassmorphism
                boxShadow: "0 4px 32px 0 rgba(31, 38, 135, 0.37)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.18)",
                width: 250,
                height: 100,
                lineHeight: "100px",
                fontSize: "2em",
                textAlign: "center",
                color: "#FFF",
                opacity: 0.95,
                transform: `rotateX(${i * 60}deg) translateZ(90px)`,
                overflow: "hidden"
              }}
            >
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 2,
                color: "#fff",
                fontWeight: 700,
                fontSize: 30,
                textShadow: "0 2px 8px #000, 0 0 2px #000",
                padding: "0 1rem",
                whiteSpace: "pre-line",
                textAlign: "center"
              }}>{word}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
