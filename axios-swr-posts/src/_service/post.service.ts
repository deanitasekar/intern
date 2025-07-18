import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://jsonplaceholder.typicode.com",
});

export const getPosts = async () => {
  try {
    const response = await api.get(`/posts`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPostById = async ( url: string) => {
  try {
		const id = url.split('/').pop();
    const response = await api.get(`/posts/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
