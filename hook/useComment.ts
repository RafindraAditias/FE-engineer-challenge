import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchComments,
  createComment,
  updateComment,
  deleteComment,
  fetchCommentById,
} from "@/lib/actions/useComments/comments";
import { Comment } from "@/types/comment";

// Hook untuk Fetch Comments
export const useComments = () => {
  return useQuery<Comment[], Error>({
    queryKey: ["comments"],
    queryFn: fetchComments,
  });
};

// Fetch satu comment berdasarkan ID
export const useComment = (id: string) => {
  return useQuery<Comment, Error>({
    queryKey: ["comment", id],
    queryFn: () => fetchCommentById(id),
    enabled: !!id, // Fetch hanya jika id tersedia
  });
};

// Hook untuk Create Comment
export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};

// Hook untuk Update Comment
export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, comment }: { id: number; comment: Partial<Comment> }) =>
      updateComment(id, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};

// Hook untuk Delete Comment
export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};