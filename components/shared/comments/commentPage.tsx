"use client";

import { useComments, useDeleteComment } from "@/hook/useComment";
import { Spin, message } from "antd";
import Link from "next/link";

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
    <div className="container mx-auto p-5 text-black">
      <h1 className="text-3xl font-bold mb-6 text-center">Comments</h1>
      {isPending ? (
        <Spin size="large" />
      ) : (
        <div className="space-y-6">
          {comments?.map((comment) => (
            <div
              key={comment.id}
              className="border rounded-lg p-4 shadow-md bg-white"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold">
                    {comment.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{comment.name}</h2>
                  <p className="text-sm text-gray-500">{comment.email}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{comment.body}</p>
              <div className="flex justify-between items-center">
                <Link
                  href={`/Home/${comment.id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsComponent;