"use client";

import { usePost } from "@/_hooks/use-post.hook";
import HeroComponent from "./hero.component";
import SidebarComponent from "./sidebar.component";
import PostGrid from "./postgrid.component";

export default function PostMain() {
  const {
    fetchers: { posts },
  } = usePost();

  const { data, error, isLoading, isValidating, mutate } = posts;

  if (isLoading) {
    return (
      <div className="homepage">
        <HeroComponent />
        <div className="main-content">
          <div className="content-wrapper">
            <div className="posts-section">
              <div className="section-header">
                <h2 className="section-title">Latest Posts</h2>
                <p className="section-subtitle">Loading posts...</p>
              </div>
            </div>
            <SidebarComponent />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="homepage">
        <HeroComponent />
        <div className="main-content">
          <div className="content-wrapper">
            <div className="posts-section">
              <div className="section-header">
                <h2 className="section-title">Latest Posts</h2>
                <p className="section-subtitle">
                  Error loading posts: {error.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="homepage">
      <HeroComponent />

      <div className="main-content">
        <div className="content-wrapper">
          <div className="posts-section">
            <div className="section-header">
              <h2 className="section-title">Latest Posts</h2>
              <p className="section-subtitle">
                Discover our most recent articles and stories
              </p>
            </div>
            <PostGrid posts={data} />
          </div>

          <SidebarComponent />
        </div>
      </div>
    </div>
  );
}
