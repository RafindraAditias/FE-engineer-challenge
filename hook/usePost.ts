import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPosts, createPost, updatePost, deletePost, fetchPostById } from "@/lib/actions/articleAction/article";
import { Post } from "@/types/post";

// Hook untuk Fetch Posts
export const usePosts = () => {
  return useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
};

// Fetch satu post berdasarkan ID
export const usePost = (id: string) => {
  return useQuery<Post, Error>({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id),
    enabled: !!id, // Fetch hanya jika id tersedia
  });
};


// Hook untuk Create Post
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

// Hook untuk Update Post
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, post }: { id: number; post: Partial<Post> }) => updatePost(id, post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

// Hook untuk Delete Post
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
