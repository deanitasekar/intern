"use client";

import React from "react";

export default function SidebarComponent() {
  const menuItems = [
    { label: "Posts", href: "/posts" },
    { label: "Journal", href: "/journal" },
    { label: "Stories", href: "/stories" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-widget">
        <h3 className="sidebar-title">Menu</h3>
        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <a key={index} href={item.href} className="sidebar-nav-link">
              <span className="nav-label">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
