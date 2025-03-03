"use client";

import { useState } from "react";
import { Table, Button, Modal, Form, Input, Spin, message } from "antd";
import { Post } from "@/types/post";
import { useCreatePost, useUpdatePost, useDeletePost } from "@/hook/usePost";

interface PostsTableProps {
    posts: Post[];
    isPending: boolean;
    isDeleting: boolean; // Tambahkan ini
    onDelete: (id: number) => void;
  }
  

const PostsTable: React.FC<PostsTableProps> = ({ posts, isPending }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [form] = Form.useForm();

  const { mutate: createPost, isPending: isCreating } = useCreatePost();
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost();
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();

  const handleOpenModal = (post?: Post) => {
    setEditingPost(post || null);
    form.setFieldsValue(post || { user_id: "", title: "", body: "" });
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
        if (editingPost) {
          updatePost(
            { id: editingPost.id, post: values },
            {
              onSuccess: () => {
                message.success("Post updated successfully!");
                handleCloseModal();
              },
              onError: () => message.error("Failed to update post."),
            }
          );
        } else {
          createPost(values, {
            onSuccess: () => {
              message.success("Post created successfully!");
              handleCloseModal();
            },
            onError: () => message.error("Failed to create post."),
          });
        }
      })
      .catch(() => message.error("Please fill in all fields."));
  };

  const handleDelete = (id: number) => {
    deletePost(id, {
      onSuccess: () => message.success("Post deleted successfully!"),
      onError: () => message.error("Failed to delete post."),
    });
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button type="primary" onClick={() => handleOpenModal()}>
          Add Post
        </Button>
      </div>

      {isPending ? (
        <Spin size="large" />
      ) : (
        <Table
          dataSource={posts}
          rowKey="id"
          columns={[
            { title: "ID", dataIndex: "id", width: 80 },
            { title: "User ID", dataIndex: "user_id" },
            { title: "Title", dataIndex: "title" },
            { title: "Body", dataIndex: "body" },
            {
              title: "Action",
              render: (_, record: Post) => (
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
        title={editingPost ? "Edit Post" : "Add Post"}
        open={isModalOpen}
        onCancel={handleCloseModal}
        onOk={handleSubmit}
        confirmLoading={isCreating || isUpdating}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="user_id"
            label="User ID"
            rules={[{ required: true, message: "Please enter a user ID" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="body"
            label="Body"
            rules={[{ required: true, message: "Please enter post content" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PostsTable;
