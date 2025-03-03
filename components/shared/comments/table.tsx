"use client";

import { useState } from "react";
import { Table, Button, Modal, Form, Input, Spin, message } from "antd";
import { Comment } from "@/types/comment";
import {
  useCreateComment,
  useUpdateComment,
  useDeleteComment,
} from "@/hook/useComment";

interface CommentsTableProps {
  comments: Comment[];
  isPending: boolean;
  isDeleting: boolean;
  onDelete: (id: number) => void;
}

const CommentsTable: React.FC<CommentsTableProps> = ({
  comments,
  isPending,
  isDeleting,
  onDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [form] = Form.useForm();

  const { mutate: createComment, isPending: isCreating } = useCreateComment();
  const { mutate: updateComment, isPending: isUpdating } = useUpdateComment();
  const { mutate: deleteComment } = useDeleteComment();

  const handleOpenModal = (comment?: Comment) => {
    setEditingComment(comment || null);
    form.setFieldsValue(comment || { post_id: "", name: "", email: "", body: "" });
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
        if (editingComment) {
          updateComment(
            { id: editingComment.id, comment: values },
            {
              onSuccess: () => {
                message.success("Comment updated successfully!");
                handleCloseModal();
              },
              onError: () => message.error("Failed to update comment."),
            }
          );
        } else {
          createComment(values, {
            onSuccess: () => {
              message.success("Comment created successfully!");
              handleCloseModal();
            },
            onError: () => message.error("Failed to create comment."),
          });
        }
      })
      .catch(() => message.error("Please fill in all fields."));
  };

  const handleDelete = (id: number) => {
    deleteComment(id, {
      onSuccess: () => message.success("Comment deleted successfully!"),
      onError: () => message.error("Failed to delete comment."),
    });
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button type="primary" onClick={() => handleOpenModal()}>
          Add Comment
        </Button>
      </div>

      {isPending ? (
        <Spin size="large" />
      ) : (
        <Table
          dataSource={comments}
          rowKey="id"
          columns={[
            { title: "ID", dataIndex: "id", width: 80 },
            { title: "Post ID", dataIndex: "post_id" },
            { title: "Name", dataIndex: "name" },
            { title: "Email", dataIndex: "email" },
            { title: "Body", dataIndex: "body" },
            {
              title: "Action",
              render: (_, record: Comment) => (
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
        title={editingComment ? "Edit Comment" : "Add Comment"}
        open={isModalOpen}
        onCancel={handleCloseModal}
        onOk={handleSubmit}
        confirmLoading={isCreating || isUpdating}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="post_id"
            label="Post ID"
            rules={[{ required: true, message: "Please enter a post ID" }]}
          >
            <Input />
          </Form.Item>
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
              { required: true, message: "Please enter an email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="body"
            label="Body"
            rules={[{ required: true, message: "Please enter comment content" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CommentsTable;