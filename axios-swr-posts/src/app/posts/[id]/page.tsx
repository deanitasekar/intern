import React from 'react';
import PostPageComponent from "./_components/post.id.component";

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;

  if (!id) {
    return (
      <div>There is no ID found</div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <PostPageComponent postId={id} />
    </div>
  );
}