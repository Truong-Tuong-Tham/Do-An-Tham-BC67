import React, { useEffect, useState } from "react";
import { Modal, Input, Select, Form, DatePicker, Row, Col, Button } from "antd";
import moment from "moment";
import { userService } from "../../../../../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { putInfoUserAction } from "../../../../../../redux/user/userSlice";

const { Option } = Select;

const UserEditModal = ({ visible, onCancel, user, onUpdate }) => {
  const [form] = Form.useForm();
  const [skills, setSkills] = useState([]);
  const { infoUser } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("user", user);
    if (visible && user) {
      form.setFieldsValue({
        avatar: user.content.avatar,
        id: user.content.id,
        name: user.content.name,
        email: user.content.email,
        phone: user.content.phone,
        birthday: user.content.birthday
          ? moment(user.content.birthday, "DD-MM-YYYY")
          : null,
        gender: user.content.gender,
        role: user.content.role,
        skill: user.content.skill || [],
      });
    }
  }, [visible, user, form]);

  const fetchSkills = async () => {
    try {
      const res = await userService.getSkill();
      const skillsData = res.data.content;
      setSkills(skillsData);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleUpdate = async () => {
    try {
      const values = form.getFieldsValue();
      console.log("values", values);
      await userService.putInfoUser(values, user.content.id);
      console.log("User updated successfully");
      console.log("Updated values:", values);

      if (onUpdate) onUpdate(user.content.id, values);
      // Update Redux store
      dispatch(putInfoUserAction({
        ...infoUser,
        user: { ...infoUser.user, ...values }
      }));
      onCancel();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Modal
      title="Edit User"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="update" type="primary" onClick={handleUpdate}>
          Update
        </Button>,
      ]}
      style={{ maxHeight: "650px" }}
      bodyStyle={{ padding: 0 }}
    >
      <Form
        form={form}
        layout="vertical"
        name="userEditForm"
        style={{ margin: "0 16px" }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="avatar"
              label="Avatar"
              rules={[
                { required: true, message: "Please enter the avatar URL!" },
              ]}
            >
              <Input placeholder="Enter avatar URL" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: "Please enter the user's name!" },
              ]}
            >
              <Input placeholder="Enter user's name" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter the user's email!" },
              ]}
            >
              <Input placeholder="Enter user's email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                {
                  required: true,
                  message: "Please enter the user's phone number!",
                },
              ]}
            >
              <Input placeholder="Enter user's phone number" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="birthday"
              label="Birthday"
              rules={[
                {
                  required: true,
                  message: "Please select the user's birthday!",
                },
              ]}
            >
              <DatePicker
                format="DD-MM-YYYY"
                placeholder="Select user's birthday"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[
                { required: true, message: "Please select the user's gender!" },
              ]}
            >
              <Select placeholder="Select gender">
                <Option value={true}>Male</Option>
                <Option value={false}>Female</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
          <Form.Item
  name="role"
  label="Role"
  rules={[
    { required: true, message: "Please select the user's role!" },
  ]}
>
  <Select placeholder="Select user's role">
    <Option value="ADMIN">Admin</Option>
    <Option value="USER">User</Option>
  </Select>
</Form.Item>

          </Col>
          <Col span={12}>
            <Form.Item name="skill" label="Skill">
              <Select
                mode="tags"
                placeholder="Add skills"
                style={{ width: "100%" }}
              >
                {skills.map((skill) => (
                  <Option key={skill.id} value={skill.tenSkill}>
                    {skill.tenSkill}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UserEditModal;
