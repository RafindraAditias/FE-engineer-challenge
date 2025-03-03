"use client";

import { usePosts, useDeletePost } from "@/hook/usePost";
import { Spin, message } from "antd";
import Link from "next/link";

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
    <div className="container mx-auto p-5 text-black">
      <h1 className="text-3xl font-bold mb-6 text-center">Blog Posts</h1>
      {isPending ? (
        <Spin size="large" />
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {posts?.map((post) => (
            <div key={post.id} className="border rounded-lg p-4 shadow-md flex flex-col w-full md:w-1/2 lg:w-1/3">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4 flex-grow">{post.body}</p>
              <div className="mt-auto flex justify-between items-center">
                <Link href={`/Home/${post.id}`} className="text-blue-500 hover:underline">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsComponent;
