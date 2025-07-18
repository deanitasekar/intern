"use client";

import React, { useState } from "react";
import { ProfileType } from "@/_types/profile.type";

export default function ProfileComponent() {
  const [showDetails, setShowDetails] = useState(false);

  const profileData: ProfileType = {
    id: 1,
    name: "Alex Thompson",
    email: "alex.thompson@example.com",
    phone: "+1 (555) 123-4567",
    website: "https://alexthompson.dev",
    bio: "Creative full-stack developer passionate about building user-friendly applications and solving complex problems through elegant code solutions.",
    address: {
      street: "789 Tech Boulevard, Unit 15C",
      city: "Austin, TX",
      zipcode: "73301",
      country: "United States",
    },
    company: {
      name: "Digital Innovations Lab",
      position: "Senior Full Stack Developer",
      industry: "Technology & Software",
    },
  };

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-placeholder">
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{profileData.name}</h1>
            <p className="profile-role">{profileData.company.position}</p>
            {profileData.bio && (
              <p className="profile-bio">{profileData.bio}</p>
            )}
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h2 className="section-title">Contact Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className="info-content">
                  <span className="info-label">Email</span>
                  <a
                    href={`mailto:${profileData.email}`}
                    className="info-value info-link"
                  >
                    {profileData.email}
                  </a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div className="info-content">
                  <span className="info-label">Phone</span>
                  <a
                    href={`tel:${profileData.phone}`}
                    className="info-value info-link"
                  >
                    {profileData.phone}
                  </a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </svg>
                </div>
                <div className="info-content">
                  <span className="info-label">Website</span>
                  <a
                    href={profileData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="info-value info-link"
                  >
                    {profileData.website}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <button
              className="button-primary show-details-btn"
              onClick={handleShowDetails}
            >
              {showDetails ? "Hide Details" : "Show More Details"}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`chevron ${showDetails ? "rotated" : ""}`}
              >
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </button>
          </div>

          {showDetails && (
            <div className="profile-details">
              <div className="detail-section">
                <h3 className="detail-title">Address</h3>
                <div className="address-content">
                  <div className="address-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div className="address-text">
                    <p>{profileData.address.street}</p>
                    <p>
                      {profileData.address.city}, {profileData.address.zipcode}
                    </p>
                    <p>{profileData.address.country}</p>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3 className="detail-title">Company</h3>
                <div className="company-content">
                  <div className="company-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 21h18"></path>
                      <path d="M5 21V7l8-4v18"></path>
                      <path d="M19 21V11l-6-4"></path>
                    </svg>
                  </div>
                  <div className="company-text">
                    <h4 className="company-name">{profileData.company.name}</h4>
                    <p className="company-position">
                      {profileData.company.position}
                    </p>
                    <p className="company-industry">
                      {profileData.company.industry}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
