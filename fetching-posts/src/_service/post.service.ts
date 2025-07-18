import { PostType } from "@/_types/post.type";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://jsonplaceholder.typicode.com';
const DEFAULT_IMAGE = '/placeholder.png';

export async function getPosts() {
	const res = await fetch(`${BASE_URL}/posts`, { next: { revalidate: 3600 } });
	if (!res.ok) throw new Error('Failed to fetch posts');
	const posts = await res.json();
	
	return posts.map((post: PostType) => ({
		...post,
		image: DEFAULT_IMAGE
	}));

}

export async function getPostById(id: string | number) {
	const res = await fetch(`${BASE_URL}/posts/${id}`, { next: { revalidate: 3600 } });
	if (!res.ok) throw new Error('Failed to fetch post');
	const post = await res.json();
	
	return {
		...post,
		image: DEFAULT_IMAGE
	};
}
