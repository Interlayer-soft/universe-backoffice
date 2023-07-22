import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Popconfirm, message } from "antd";


import * as adminService from "../../../services/adminService";


interface User {
  id: string;
  username: string;
  password: string;
}

const AdminManagement: React.FC<{}> = () => {
  const [users, setUsers] = useState<User[]>([
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      const admins = await adminService.getAdmins();
      setUsers(admins);
    };

    fetchData();
  }, []);

  const columns = [
    { title: "#", dataIndex: "rowNumber", key: "rowNumber" },
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Username", dataIndex: "username", key: "username" },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
      render: (password: string) => "******",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, user: User) => (
        <>
          <Button onClick={() => handleEdit(user)}>Edit</Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(user.id)}
            onCancel={() => setDeleteUserId(null)}
            visible={isDeleteConfirmationVisible && deleteUserId === user.id}
            okText="Yes"
            cancelText="No"
          >
            <Button onClick={() => showDeleteConfirmation(user.id)}>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleEdit = (user: User) => {
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      // Update user in API or any data source
      // For simplicity, I'm just updating the state here
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === values.id ? { ...user, ...values } : user
        )
      );

      setIsModalVisible(false);
    });
  };

  const handleDelete = (userId: string) => {
    // Delete user in API or any data source
    // For simplicity, I'm just updating the state here
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    message.success("User deleted successfully");
    setDeleteUserId(null);
  };

  const showDeleteConfirmation = (userId: string) => {
    setDeleteUserId(userId);
    setIsDeleteConfirmationVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setDeleteUserId(null);
    setIsDeleteConfirmationVisible(false);
  };

  const tableData = users.map((user, index) => ({
    ...user,
    rowNumber: index + 1,
  }));

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add User
      </Button>

      <Table dataSource={tableData} columns={columns} />

      <Modal
        title="Edit User"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="id" label="ID" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="username" label="Username">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminManagement;
