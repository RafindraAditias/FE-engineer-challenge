"use client";

import { usePosts, useDeletePost } from "@/hook/usePost";
import { Spin, message } from "antd";
import PostsTable from "./table";
import { Post } from "@/types/post";

const PostsComponent = () => {
  const { data: posts, isPending } = usePosts();
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();

  const handleDelete = (id: number) => {
    deletePost(id, {
      onSuccess: () => message.success("Post deleted successfully!"),
      onError: () => message.error("Failed to delete post."),
    });
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-xl font-bold mb-4">Post List</h1>
      {isPending ? (
        <Spin size="large" />
      ) : (
        <PostsTable
          posts={posts as Post[]}
          isPending={isPending}
          isDeleting={isDeleting}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default PostsComponent;

