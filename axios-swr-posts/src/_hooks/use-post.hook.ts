import useSWR from "swr";
import * as api from "../_service/post.service";

export const usePost = () => {
	const posts = useSWR(`/posts`, api.getPosts);

	return {
		fetchers: {
			posts,
		},
	};
};

export const usePostById = ( id: string ) => {
	const post = useSWR(`/posts/${id}`, api.getPostById);

	return {
		fetchers: {
			post,
		}
	}
}
