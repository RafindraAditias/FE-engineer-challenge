"use client";

import DashboardUser from "@/components/shared/users/dashboardUser";
import DashboardPost from "@/components/shared/posts/dashboardPost";
import DashboardComment from "@/components/shared/comments/Dashboard";

const UsersComponent = () => {
  return (
    <div className="container mx-auto p-5 text-black">
      <DashboardUser />
      <DashboardPost />
      <DashboardComment />
    </div>
  );
};

export default UsersComponent;
