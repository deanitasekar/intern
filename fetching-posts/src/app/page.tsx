import React from 'react'
import { getPosts } from '@/_service/post.service';
import PostMain from '@/_components/post.main';
import { PostType } from '@/_types/post.type';


export default async function Page() {
  const posts: PostType[]= await getPosts();
  return (
    <div className="min-h-screen bg-gray-100">
      <PostMain posts={posts}/>
    </div>
  )
}
