import React, { useEffect, useState } from "react";
import { Modal, Badge, Descriptions, Avatar, Divider, Typography, Tag } from "antd";
import { MailOutlined, PhoneOutlined, UserOutlined, CalendarOutlined, TagOutlined } from "@ant-design/icons";
import '../Modal/UserDetailModal.css';

const { Title, Text } = Typography;

const UserDetailModal = ({ visible, onCancel, user }) => {
  const [localUser, setLocalUser] = useState(user);

  useEffect(() => {
    setLocalUser(user);
  }, [user]);

  if (!localUser) return null;

  const { avatar, name, gender, role, email, phone, birthday, skill, certification } = localUser.content;

  // Format birthday
  const formatDate = (date) => {
    if (!date) return "Not Provided";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <Modal
    visible={visible}
    title="User Details"
    onCancel={onCancel}
    footer={null}
      centered
      width={600}
      className="user-detail-modal-modern"
    >
      <div className="user-detail-modal-content">
        <div className="user-detail-header">
          <Avatar size={100} src={avatar} className="user-avatar" />
          <div className="user-detail-info">
            <Title level={3} className="user-name">{name}</Title>
            <Badge
              count={gender ? "Male" : "Female"}
              style={{ backgroundColor: gender ? "#1890ff" : "#eb2f96" }}
            />
            <Text type="secondary" className="user-role">{role}</Text>
          </div>
        </div>

        <Divider dashed />

        <Descriptions bordered column={1} className="user-detail-descriptions">
          <Descriptions.Item label={<><MailOutlined /> Email:</>} className="user-detail-item">
            {email}
          </Descriptions.Item>
          <Descriptions.Item label={<><PhoneOutlined /> Phone:</>} className="user-detail-item">
            {phone}
          </Descriptions.Item>
          <Descriptions.Item label={<><CalendarOutlined /> Birthday:</>} className="user-detail-item">
            {formatDate(birthday)}
          </Descriptions.Item>
          <Descriptions.Item label={<><TagOutlined /> Skills:</>} className="user-detail-item">
            {skill.length ? skill.map(s => <Tag key={s} color="blue">{s}</Tag>) : "None"}
          </Descriptions.Item>
          <Descriptions.Item label={<><TagOutlined /> Certifications:</>} className="user-detail-item">
            {certification.length ? certification.map(c => <Tag key={c} color="green">{c}</Tag>) : "None"}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </Modal>
  );
};

export default UserDetailModal;
