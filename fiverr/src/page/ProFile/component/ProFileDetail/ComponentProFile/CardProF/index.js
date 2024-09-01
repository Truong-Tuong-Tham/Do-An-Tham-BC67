import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  Button,
  Input,
  Form,
  Select,
  DatePicker,
  message,
  Upload,
} from "antd";
import { userService } from "../../../../../../services/userService";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import { putInfoUserAction } from "../../../../../../redux/user/userSlice";

const { Option } = Select;

const CardInF = ({ idUser }) => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { infoUser } = useSelector((state) => state.userReducer);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await userService.getUserID(idUser);
        const userInfo = res.data.content;
        setInfo(userInfo);
        console.log("user", userInfo);
        form.setFieldsValue({
          ...userInfo,
          skill: userInfo.skill.join(", "),
          certification: userInfo.certification.join(", "),
          gender: userInfo.gender ? "Male" : "Female",
          birthday: userInfo.birthday ? moment(userInfo.birthday) : null,
          role: userInfo.role,
        });
      } catch (err) {
        message.error("Failed to fetch user info.");
      }
    };

    fetchUserInfo();
  }, [idUser, form]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleEdit = () => {
    setIsModalVisible(true);
    setDropdownOpen(false);
  };

  const handleAvatarEdit = () => {
    setIsAvatarModalVisible(true);
    setDropdownOpen(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsAvatarModalVisible(false);
    setDropdownOpen(false);
  };

  const handleUpdate = async (values) => {
    try {
      const updatedValues = {
        id: idUser,
        name: values.name || "",
        email: values.email || "",
        phone: values.phone || "",
        birthday: values.birthday ? values.birthday.format("YYYY-MM-DD") : null,
        gender: values.gender === "Male",
        role: values.role || "",
        skill: values.skill
          ? values.skill.split(",").map((item) => item.trim())
          : [],
        certification: values.certification
          ? values.certification.split(",").map((item) => item.trim())
          : [],
        avatar: values.avatar || info.avatar || "",
      };
  
      await userService.putInfoUser(updatedValues, idUser);
  
      // Update Redux store
      dispatch(putInfoUserAction({
        ...infoUser,
        user: { ...infoUser.user, ...updatedValues }
      }));
  
      setInfo(updatedValues);
      setIsModalVisible(false);
      message.success("User info updated successfully.");
    } catch (err) {
      message.error("Failed to update user info.");
    }
  };
  

  const handleAvatarUpload = async () => {
    if (!selectedFile) {
      message.error("Please choose a file first.");
      return;
    }
  
    const formData = new FormData();
    formData.append("Formfile", selectedFile, selectedFile.name);
    try {
      const response = await userService.postAvatar(formData);
      const newAvatarUrl = response.data?.content?.avatar;
  
      if (newAvatarUrl) {
        // Update Redux store
        dispatch(putInfoUserAction({
          ...infoUser,
          user: { ...infoUser.user, avatar: newAvatarUrl }
        }));
  
        setInfo((prevInfo) => ({
          ...prevInfo,
          avatar: newAvatarUrl,
        }));
      }
  
      message.success("Avatar updated successfully.");
      setIsAvatarModalVisible(false);
    } catch (error) {
      message.error("Failed to update avatar.");
    }
  };
  

  const onFileChange = ({ file }) => {
    setSelectedFile(file);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className="relative bg-white rounded-lg shadow-xl p-8">
      <div className="w-full h-[250px]">
        <img
          src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
          alt="Profile Background"
          className="w-full h-full rounded-tl-lg rounded-tr-lg"
        />
      </div>
      <div className="flex flex-col items-center -mt-20">
        <img
          src={
            info?.avatar || infoUser.avatar || "https://via.placeholder.com/150"
          }
          alt={`${info?.name}'s avatar`}
          className="w-40 h-40 border-4 border-white rounded-full shadow-lg"
        />
        <div className="flex items-center space-x-2 mt-2">
          <p className="text-2xl">{info?.name || "User Name"}</p>
          <span className="bg-blue-500 rounded-full mb-5 p-1" title="Verified">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-100  h-2.5 w-2.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </span>
        </div>
        <p className="text-gray-700">Senior Software Engineer at Home</p>
        <p className="text-sm text-gray-500">An Giang, VietNam</p>
      </div>
      <div className="absolute top-4 right-8">
        <button
          onClick={toggleDropdown}
          className="text-gray-500 hover:text-gray-700 p-2 rounded"
          title="Settings"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 mt-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg"
          >
            <div className="py-2 border-b">
              <p className="text-gray-400 text-xs px-4 uppercase mb-1">
                Settings
              </p>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleEdit();
                }}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Edit
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleAvatarEdit();
                }}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Change Avatar
              </a>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center space-x-4 mt-4">
      <div className="flex justify-center space-x-4 mt-4">
 <div className="flex justify-center space-x-4 mt-4">
  <a
    href="/profile-overview" // or use a function to handle navigation
    className="text-blue-600 hover:text-blue-800 flex items-center space-x-2"
    title="View Profile Overview"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 4v16m8-8H4"
      />
    </svg>
    <span>Profile Overview</span>
  </a>
  <a
    href="/settings" // or use a function to handle navigation
    className="text-gray-600 hover:text-gray-800 flex items-center space-x-2"
    title="Go to Settings"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 8v8m4-4H8"
      />
    </svg>
    <span>Settings</span>
  </a>
</div>

</div>

      </div>

      <Modal
        title="Edit User Info"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              handleUpdate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="Birthday" name="birthday">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Gender" name="gender">
            <Select>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Role" name="role">
            <Input />
          </Form.Item>
          <Form.Item label="Skills" name="skill">
            <Input placeholder="Comma separated values" />
          </Form.Item>
          <Form.Item label="Certifications" name="certification">
            <Input placeholder="Comma separated values" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Change Avatar"
        visible={isAvatarModalVisible}
        onCancel={handleCancel}
        onOk={handleAvatarUpload}
      >
        <Upload
          beforeUpload={() => false}
          onChange={onFileChange}
          fileList={selectedFile ? [selectedFile] : []}
        >
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
      </Modal>
    </div>
  );
};

export default CardInF;
