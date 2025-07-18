"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function NavbarComponent() {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push("/profile");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-profile">
          <button
            className="profile-button"
            onClick={handleProfileClick}
            aria-label="Go to profile"
          >
            <div className="profile-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <span className="profile-text">Profile</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
