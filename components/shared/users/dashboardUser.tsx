"use client";

import { useUsers, useDeleteUser } from "@/hook/useUsers";
import { Spin, message } from "antd";
import UsersTable from "./table";
import { User } from "@/types/user";

const UsersComponent = () => {
  const { data: users, isPending } = useUsers();
  const { mutate: deleteUsers, isPending: isDeleting } = useDeleteUser();

  const handleDelete = (id: number) => {
    deleteUsers(id, {
      onSuccess: () => message.success("User deleted successfully!"),
      onError: () => message.error("Failed to delete user."),
    });
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-xl font-bold mb-4">User List</h1>
      {isPending ? (
        <Spin size="large" />
      ) : (
        <UsersTable
          users={users as User[]}
          isPending={isPending}
          isDeleting={isDeleting}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default UsersComponent;
