"use client";

import Post from "@/components/shared/posts/postPage";
import Comment from "@/components/shared/comments/commentPage";
const UsersComponent = () => {
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-xl font-bold mb-4">User List</h1>
      <Post />
      <Comment />
    </div>
  );
};

export default UsersComponent;
