"use client";

import React from "react";

export default function HeroComponent() {
  const handleExploreClick = () => {
    const postsSection = document.querySelector(".posts-section");
    if (postsSection) {
      postsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="hero-banner">
      <div className="hero-content">
        <h1 className="hero-title">Welcome!</h1>
        <p className="hero-subtitle">
          Discover amazing stories, insights, and ideas from our community
        </p>
        <button
          className="button-secondary hero-button"
          onClick={handleExploreClick}
        >
          Explore
        </button>
      </div>
    </div>
  );
}
