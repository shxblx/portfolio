"use client";

import { useRef, useState, useEffect } from "react";

export default function About() {
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const fullText =
    "I'm a self-taught Full Stack Developer with 1.5+ years of hands-on experience and 2 months of industrial experience specializing in the MERN Stack (MongoDB, Express.js, React.js, Node.js). Passionate about building scalable and user-centric web apps. I recently worked in a startup company where I solely handled frontend, backend, deployment, and testing for a live product.";
  const typingSpeed = 50;
  const cursorBlinkSpeed = 500;

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayText((prev) => prev + fullText.charAt(currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, typingSpeed);

    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  useEffect(() => {
    if (isTypingComplete) {
      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, cursorBlinkSpeed);

      return () => {
        clearInterval(cursorInterval);
      };
    }
  }, [isTypingComplete]);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">About Me</h2>
      <div className="space-y-4 text-lg text-muted-foreground">
        <p>
          {displayText}
          {(!isTypingComplete || showCursor) && "_"}
        </p>
      </div>
    </div>
  );
}
