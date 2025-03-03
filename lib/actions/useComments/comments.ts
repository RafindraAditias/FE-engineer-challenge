import axios from "axios";
import { Comment } from "@/types/comment";
// Konfigurasi axios
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.NEXT_PUBLIC_GOREST_TOKEN}`;

// Fetch Comments (GET)
export const fetchComments = async (): Promise<Comment[]> => {
  const response = await axios.get<Comment[]>("/comments");
  return response.data;
};

// Fetch Comment by ID (GET)
export const fetchCommentById = async (id: string): Promise<Comment> => {
  const response = await axios.get<Comment>(`/comments/${id}`);
  return response.data;
};

// Create Comment (POST)
export const createComment = async (comment: Partial<Comment>): Promise<Comment> => {
  const response = await axios.post<Comment>("/comments", comment, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// Update Comment (PUT)
export const updateComment = async (id: number, comment: Partial<Comment>): Promise<Comment> => {
  const response = await axios.put<Comment>(`/comments/${id}`, comment);
  return response.data;
};

// Delete Comment (DELETE)
export const deleteComment = async (id: number): Promise<void> => {
  await axios.delete(`/comments/${id}`);
};