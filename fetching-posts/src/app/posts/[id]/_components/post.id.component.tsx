"use client";

import { PostType } from "@/_types/post.type";
import Image from "next/image";

interface PostPageComponentProps {
  post: PostType;
}

export default function PostPageComponent({ post }: PostPageComponentProps) {
  return (
	<div className="app-layout">
		{/* <NavbarComponent /> */}
    <div className="post-detail-container">
      <Image
        src={post.image}
        alt={post.title}
        width={900}
        height={500}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
        style={{
          width: "100%",
          height: "500px",
          objectFit: "cover",
          display: "block",
          transition: "all 0.3s ease",
        }}
      />
      <div className="post-detail-content">
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
    </div>
		{/* <FooterComponent /> */}
	</div>
  );
}
