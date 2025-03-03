"use client";

import { useState } from "react";
import { Table, Button, Modal, Form, Input, Spin, message, Select } from "antd";
import { User } from "@/types/user";
import { useCreateUser, useUpdateUser, useDeleteUser } from "@/hook/useUsers";

interface UsersTableProps {
  users: User[];
  isPending: boolean;
  isDeleting: boolean;
  onDelete: (id: number) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, isPending }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();

  const { mutate: createUser, isPending: isCreating } = useCreateUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  const handleOpenModal = (user?: User) => {
    setEditingUser(user || null);
    form.setFieldsValue(user || { name: "", email: "" });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingUser) {
          updateUser(
            { id: editingUser.id, user: values },
            {
              onSuccess: () => {
                message.success("User updated successfully!");
                handleCloseModal();
              },
              onError: () => message.error("Failed to update user."),
            }
          );
        } else {
          createUser(values, {
            onSuccess: () => {
              message.success("User created successfully!");
              handleCloseModal();
            },
            onError: () => message.error("Failed to create user."),
          });
        }
      })
      .catch(() => message.error("Please fill in all fields."));
  };

  const handleDelete = (id: number) => {
    deleteUser(id, {
      onSuccess: () => message.success("User deleted successfully!"),
      onError: () => message.error("Failed to delete user."),
    });
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button type="primary" onClick={() => handleOpenModal()}>
          Add User
        </Button>
      </div>

      {isPending ? (
        <Spin size="large" />
      ) : (
        <Table
          dataSource={users}
          rowKey="id"
          columns={[
            { title: "ID", dataIndex: "id", width: 80 },
            { title: "Name", dataIndex: "name" },
            { title: "Email", dataIndex: "email" },
            { title: "Gender", dataIndex: "gender" },
            { title: "Status", dataIndex: "status" },
            {
              title: "Action",
              render: (_, record: User) => (
                <div className="flex gap-2">
                  <Button onClick={() => handleOpenModal(record)}>Edit</Button>
                  <Button
                    danger
                    loading={isDeleting}
                    onClick={() => handleDelete(record.id)}
                  >
                    Delete
                  </Button>
                </div>
              ),
            },
          ]}
        />
      )}

      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        open={isModalOpen}
        onCancel={handleCloseModal}
        onOk={handleSubmit}
        confirmLoading={isCreating || isUpdating}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select a gender" }]}
          >
            <Select>
              <Select.Option value="male">male</Select.Option>
              <Select.Option value="female">female</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select a status" }]}
          >
            <Select>
              <Select.Option value="active">active</Select.Option>
              <Select.Option value="inactive">inactive</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UsersTable;
