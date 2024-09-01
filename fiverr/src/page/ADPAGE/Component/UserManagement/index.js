import React, { useEffect, useState } from "react";
import { userService } from "../../../../services/userService";
import {
  Form,
  notification,
  Modal,
  Select,
  Input,
  Button,
  Table,
  Space,
  Tag,
} from "antd";
import { useParams } from "react-router-dom";
import UserDetailModal from "./Component/Modal";
import UserEditModal from "./Component/EditModal";

const { Option } = Select;

const UserManagement = () => {
  const { iduser } = useParams();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState(""); // New state for role filter
  const [form] = Form.useForm(); // Initialize the form

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6; // Number of users per page
  const defaultAvatarMale =
  "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611716.jpg?w=740&t=st=1725096040~exp=1725096640~hmac=1009c8f3917cc3a7ed9b438e32238fc9b20fb2917244be8bd7c1e79303fd88df";
const defaultAvatarFemale =
  "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611731.jpg?w=740&t=st=1725095976~exp=1725096576~hmac=693722cc51a56ac9b361515cbd6053de90fbe5f8c0c21f50653dd6bc67e3c001";

  const fetchUserData = async () => {
    try {
    
      const res = await userService.getListUser();
      const users = res.data.content;
      setUserData(users);
    } catch (error) {
      setError("Error fetching user data. Please try again later.");
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleViewDetails = async (userId) => {
    try {
      const res = await userService.getUserID(userId);
      setSelectedUser(res.data);
      setIsDetailModalVisible(true);
    } catch (error) {
      setError("Error fetching user details. Please try again later.");
      console.error("Error fetching user details:", error);
    }
  };

  const handleDelete = (Id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this user?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await userService.deleteUser(Id);

          notification.success({
            message: "Success",
            description: "User deleted successfully!",
          });
          fetchUserData();
        } catch (error) {
          notification.error({
            message: "Error",
            description: "Error deleting user. Please try again later.",
          });
          console.error("Error deleting user:", error);
        }
      },
    });
  };

  const handleEditUser = async (userId) => {
    try {
      const res = await userService.getUserID(userId);
      setSelectedUser(res.data);
     
      setIsEditModalVisible(true);
    } catch (error) {
      console.error("Error getting user for editing:", error);
    }
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalVisible(false);
    setSelectedUser(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
    setSelectedUser(null);
  };
  const handleUpdate = (userId, updatedUser) => {
    setUserData((prevUserData) => {
      const updatedData = prevUserData.map((user) => {
        if (user.id === userId) {
          const updatedAvatar = updatedUser.avatar || user.avatar;
          return {
            ...user,
            ...updatedUser,
            avatar: updatedAvatar,
          };
        }
        return user;
      });
      return updatedData;
    });
  };

  const handleAddUser = async (values) => {
    try {
      await userService.postUser(values);
      notification.success({
        message: "Success",
        description: "User added successfully!",
      });
      setIsAddModalVisible(false);
      form.resetFields();
      fetchUserData(); // Refresh user list
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Error adding user. Please try again later.",
      });
      console.error("Error adding user:", error);
    }
  };

  // Filter users based on search query and role
  const filteredUsers = userData
    .filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((user) => (selectedRole ? user.role === selectedRole : true));

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return <div className="text-center py-4 text-red-600">{error}</div>;
  if (userData.length === 0)
    return <div className="text-center py-4">No users found.</div>;

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => (
        <img
          src={avatar||defaultAvatarFemale}
          alt="Avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "admin" ? "blue" : "green"}>{role}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleViewDetails(record.id)}>
            View
          </Button>
          <Button type="link" onClick={() => handleEditUser(record.id)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-4 flex justify-between items-center">
        <Button
          type="primary"
          onClick={() => setIsAddModalVisible(true)}
          className="shadow-md hover:shadow-lg transition-shadow"
        >
          Add User
        </Button>
        <div className="flex space-x-4 items-center">
          <Input
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="shadow-md rounded"
            style={{ maxWidth: 300 }}
          />
          <Select
            placeholder="Filter by role"
            value={selectedRole}
            onChange={(value) => setSelectedRole(value)}
            style={{ maxWidth: 200 }}
            className="shadow-md rounded"
          >
            <Option value="">All Roles</Option>
            <Option value="ADMIN">Admin</Option>
            <Option value="USER">User</Option>
          </Select>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={currentUsers}
        pagination={false}
        rowKey="id"
        className="shadow-md h-[540px] rounded bg-white"
      />

      <div className="flex justify-center items-center py-4 space-x-4">
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-gray-300 text-gray-700 hover:bg-gray-400 transition-colors rounded-lg px-4 py-2"
        >
          Previous
        </Button>
        <span className="text-lg font-medium text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-gray-300 text-gray-700 hover:bg-gray-400 transition-colors rounded-lg px-4 py-2"
        >
          Next
        </Button>
      </div>

      <UserDetailModal
        visible={isDetailModalVisible}
        onCancel={handleCloseDetailModal}
        user={selectedUser}
      />

      <UserEditModal
        visible={isEditModalVisible}
        onCancel={handleCloseEditModal}
        user={selectedUser}
        onUpdate={handleUpdate}
      />

      <Modal
        visible={isAddModalVisible}
        title="Add New User"
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
        className="rounded-lg shadow-xl"
      >
        <Form form={form} onFinish={handleAddUser} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter the user's name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter the user's email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter the user's password" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[
              { required: true, message: "Please select the user's role" },
            ]}
          >
            <Select>
              <Option value="ADMIN">Admin</Option>
              <Option value="USER">User</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add User
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
