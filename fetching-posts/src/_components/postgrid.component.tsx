"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PostType } from "@/_types/post.type";

interface PostGridProps {
  posts: PostType[];
}

export default function PostGrid({ posts }: PostGridProps) {
  const router = useRouter();

  const handleReadMoreClick = (postId: number) => {
    router.push(`/posts/${postId}`);
  };

  const handleCardClick = (postId: number) => {
    router.push(`/posts/${postId}`);
  };

  return (
    <div className="posts-grid">
      {posts.map((post) => (
        <div
          key={post.id}
          className="post-card"
          onClick={() => handleCardClick(post.id)}
          style={{ cursor: "pointer" }}
        >
          <div className="post-image-container">
            <Image
              src={post.image}
              alt={post.title}
              width={300}
              height={220}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.3s ease",
              }}
            />
          </div>
          <div className="post-content">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-excerpt">{post.body.substring(0, 150)}...</p>
            <div className="post-meta">
              <button
                className="read-more"
                onClick={(e) => {
                  e.stopPropagation();
                  handleReadMoreClick(post.id);
                }}
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
