import axios from "axios";
import { Post } from "@/types/post";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.NEXT_PUBLIC_GOREST_TOKEN}`;

// Fetch Posts (GET)
export const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get<Post[]>("/posts");
  return response.data;
};

export const fetchPostById = async (id: string) => {
  const response = await fetch(`/api/posts/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }
  return response.json();
};


// Create Post (POST)
export const createPost = async (post: Partial<Post>): Promise<Post> => {
  console.log("Creating post with data:", post);

  const response = await axios.post<Post>("/posts", post, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};

// Update Post (PUT)
export const updatePost = async (id: number, post: Partial<Post>): Promise<Post> => {
  const response = await axios.put<Post>(`/posts/${id}`, post);
  return response.data;
};

// Delete Post (DELETE)
export const deletePost = async (id: number): Promise<void> => {
  await axios.delete(`/posts/${id}`);
};
