"use client";

import React from "react";
import Image from "next/image";
import { PostType } from "@/_types/post.type";

interface PostComponentProps {
  post: PostType;
}

export default function PostComponent({ post }: PostComponentProps) {
  return (
    <div className="bg-white">
      <div className="post-container">
        <Image
          src={post.image}
          alt={post.title}
          width={800}
          height={400}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            transition: "transform 0.3s ease",
            borderRadius: "8px",
          }}
        />
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
    </div>
  );
}
