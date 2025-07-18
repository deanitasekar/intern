"use client";

import { usePostById } from "@/_hooks/use-post.hook";
import Image from "next/image";

interface PostPageComponentProps {
  postId: string;
}

export default function PostPageComponent({ postId }: PostPageComponentProps) {
  const {
    fetchers: { post },
  } = usePostById(postId);

  const { data, error, isLoading, isValidating, mutate } = post;

  if (isLoading) {
    return (
      <div className="app-layout">
        <div className="post-detail-container">
          <p>Loading post...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app-layout">
        <div className="post-detail-container">
          <p>Error loading post: {error.message}</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="app-layout">
        <div className="post-detail=container">
          <p>Post could not be found</p>
        </div>
      </div>
    )
  }

  return (
	<div className="app-layout">
    <div className="post-detail-container">
      <Image
        src='/placeholder.png'
        alt={data.title}
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
        <h2>{data.title}</h2>
        <p>{data.body}</p>
      </div>
    </div>
	</div>
  );
}
