"use client";

import { useComments, useDeleteComment } from "@/hook/useComment";
import { Spin, message } from "antd";
import CommentsTable from "@/components/shared/comments/table";
import { Comment } from "@/types/comment";

const CommentsComponent = () => {
  const { data: comments, isPending } = useComments();
  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment();

  const handleDelete = (id: number) => {
    deleteComment(id, {
      onSuccess: () => message.success("Comment deleted successfully!"),
      onError: () => message.error("Failed to delete comment."),
    });
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-xl font-bold mb-4">Comment List</h1>
      {isPending ? (
        <Spin size="large" />
      ) : (
        <CommentsTable
          comments={comments as Comment[]}
          isPending={isPending}
          isDeleting={isDeleting}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default CommentsComponent;