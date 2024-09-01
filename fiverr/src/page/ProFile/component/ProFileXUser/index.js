import React, { useEffect, useState } from "react";
import { userService } from "../../../../services/userService";
import { useParams } from "react-router-dom";
import { Card, List, Statistic, Avatar, Button } from "antd";
import {
  StarOutlined,
  FileTextOutlined,
  DollarOutlined,
  ProjectOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const ProfileX = () => {
  const [infoUser, setInfoUser] = useState({});
  const { iduser } = useParams();

  // Static data for performance metrics and portfolio
  const performanceMetrics = {
    completedProjects: 120, // Example data
    totalEarnings: 25600.75, // Example data
    averageRating: 4.7, // Example data
  };

  const portfolio = [
    {
      id: 1,
      title: "UI/UX Design for Startup",
      description:
        "This project entailed the creation of a comprehensive UI/UX design for a burgeoning tech startup, aiming to establish a strong brand presence in a competitive market. The design process began with thorough research into the target audience, industry trends, and the startup's unique value proposition. Emphasizing a modern, clean aesthetic, the design integrates intuitive navigation elements and interactive features that enhance user engagement. The result is a visually appealing and highly functional interface that not only aligns with the startup's brand identity but also ensures a seamless and enjoyable user experience. The project involved iterative design sprints, user testing, and feedback incorporation to refine and perfect the design, ultimately delivering a product that effectively meets user needs and business objectives.",
      imageUrl:
        "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600", // Image from Pexels
    },
    {
      id: 2,
      title: "Responsive Web Design",
      description:
        "This project focused on the development of a sophisticated responsive web design tailored to ensure a flawless user experience across all device types and screen sizes. The design approach was centered around creating a dynamic and adaptable layout that adjusts seamlessly to various resolutions, from large desktop monitors to smaller mobile screens. Key considerations included optimizing the user interface for touch interactions on mobile devices, maintaining readability and usability across different screen sizes, and ensuring that all interactive elements are easily accessible. The implementation of responsive design techniques involved the use of fluid grids, flexible images, and media queries to adapt the layout and content dynamically. The end result is a versatile website that offers an optimal viewing experience, enhances user engagement, and supports the site's accessibility goals, providing a consistent and professional appearance regardless of the device used.",
      imageUrl:
        "https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Image from Pexels
    },
  ];
  

  const position =
    infoUser.name == null ? "Not provided" : "Senior Software Engineer";

  const fetchingUser = async () => {
    try {
      const res = await userService.getUserID(iduser);
      setInfoUser(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingUser();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-xl pb-8">
      <div className="w-full h-[250px]">
        <img
          src="https://images.pexels.com/photos/808510/pexels-photo-808510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="w-full h-full rounded-tl-lg rounded-tr-lg"
          alt="Background"
        />
      </div>
      <div className="flex flex-col items-center -mt-20">
        <img
          src={
            infoUser.avatar ||
            "https://img.freepik.com/free-vector/elegant-man-profile-avatar-character_24877-83238.jpg?w=740&t=st=1725179597~exp=1725180197~hmac=83c133d07e059690f44d6c368badd3db952b6b4a94ba9992d5e96bb902cbed38"
          }
          className="w-40 border-4 border-white rounded-full"
          alt="Avatar"
        />
        <div className="flex items-center space-x-2 mt-2 ">
          <p className="text-2xl">{infoUser.name}</p>
          <span className="bg-blue-500 rounded-full p-1 mb-5" title="Verified">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-100 h-2.5 w-2.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </span>
        </div>
        <p className="text-gray-700">{position}</p>
        <div className="mt-4 flex space-x-4">
          <Button type="primary" icon={<UserAddOutlined />}>
            Follow
          </Button>
          <Button type="default" icon={<FileTextOutlined />}>
            Content
          </Button>
        </div>
      </div>
      <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
        <div className="w-full flex flex-col 2xl:w-1/3">
          <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
            <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
            <ul className="mt-2 text-gray-700">
              <li className="flex border-y py-2">
                <span className="font-bold w-24">Full name:</span>
                <span className="text-gray-700">
                  {infoUser.name || "Not provided"}
                </span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Birthday:</span>
                <span className="text-gray-700">
                  {infoUser.birthday || "Not provided"}
                </span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Mobile:</span>
                <span className="text-gray-700">
                  {infoUser.phone || "Not provided"}
                </span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Email:</span>
                <span className="text-gray-700">
                  {infoUser.email || "Not provided"}
                </span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Location:</span>
                <span className="text-gray-700">
                  {infoUser.location || "City"}
                </span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Languages:</span>
                <span className="text-gray-700">
                  {infoUser.languages || "VN"}
                </span>
              </li>
              <li className="flex items-center border-b py-2 space-x-2">
                <span className="font-bold w-24">Elsewhere:</span>
                <a href="#" title="Facebook">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 506.86 506.86"
                  >
                    <path
                      d="M506.86,253.43C506.86,113.46,393.39,0,253.43,0S0,113.46,0,253.43C0,379.92,92.68,484.77,213.83,503.78V326.69H149.48V253.43h64.35V197.6c0-63.52,37.84-98.6,95.72-98.6,27.73,0,56.73,5,56.73,5v62.36H334.33c-31.49,0-41.3,19.54-41.3,39.58v47.54h70.28l-11.23,73.26H293V503.78C414.18,484.77,506.86,379.92,506.86,253.43Z"
                      className="cls-1"
                    />
                  </svg>
                </a>
                <a href="#" title="Twitter">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 333333 333333"
                    shape-rendering="geometricPrecision"
                    text-rendering="geometricPrecision"
                    image-rendering="optimizeQuality"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  >
                    <path
                      d="M166667 0c92048 0 166667 74619 166667 166667s-74619 166667-166667 166667S0 258715 0 166667 74619 0 166667 0zm90493 110539c-6654 2976-13822 4953-21307 5835 7669-4593 13533-11870 16333-20535-7168 4239-15133 7348-23574 9011-6787-7211-16426-11694-27105-11694-20504 0-37104 16610-37104 37101 0 2893 320 5722 949 8450-30852-1564-58204-16333-76513-38806-3285 5666-5022 12109-5022 18661v4c0 12866 6532 24246 16500 30882-6083-180-11804-1876-16828-4626v464c0 17993 12789 33007 29783 36400-3113 845-6400 1313-9786 1313-2398 0-4709-184-7007-664 4746 14736 18448 25478 34673 25791-12722 9967-28700 15902-46120 15902-3006 0-5935-184-8860-534 16466 10565 35972 16684 56928 16684 68271 0 105636-56577 105636-105632 0-1630-36-3209-104-4806 7251-5187 13538-11733 18514-19185l17-17-3 2z"
                      fill="#1da1f2"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full flex flex-col 2xl:w-2/3">
          <Card title="Bio" className="mb-4">
            <p>{infoUser.bio || "No bio available."}</p>
          </Card>
          <Card title="Skills" className="mb-4">
            <ul className="list-disc pl-5">
              {infoUser.skills && infoUser.skills.length > 0 ? (
                infoUser.skills.map((skill, index) => (
                  <li key={index} className="text-gray-700">
                    <StarOutlined /> {skill}
                  </li>
                ))
              ) : (
                <li className="text-gray-700">No skills provided.</li>
              )}
            </ul>
          </Card>

          {/* Performance Metrics Section */}
          <div className="w-full flex flex-col 2xl:w-1/3">
            <Card title="Performance Metrics" className="mb-4">
              <div className="flex flex-col space-y-4">
                <Statistic
                  title="Completed Projects"
                  value={performanceMetrics.completedProjects}
                  prefix={<ProjectOutlined />}
                />
                <Statistic
                  title="Total Earnings"
                  value={performanceMetrics.totalEarnings}
                  prefix={<DollarOutlined />}
                  precision={2}
                />
                <Statistic
                  title="Average Rating"
                  value={performanceMetrics.averageRating}
                  prefix={<StarOutlined />}
                />
              </div>
            </Card>
          </div>

          <div className="w-full flex flex-col 2xl:w-2/3">
  <Card title="Portfolio" className="mb-4 shadow-lg rounded-lg">
    {portfolio && portfolio.length > 0 ? (
      <List
        itemLayout="vertical"
        size="large"
        dataSource={portfolio}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            extra={
              <img
                className="w-full h-60 object-cover rounded-lg shadow-md"
                alt={item.title}
                src={item.imageUrl}
              />
            }
          >
            <List.Item.Meta
              title={<h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>}
              description={
                <p className="text-gray-600 text-sm mt-1">{item.description}</p>
              }
            />
          </List.Item>
        )}
      />
    ) : (
      <p className="text-gray-500">No projects available in the portfolio.</p>
    )}
  </Card>
</div>

        </div>
      </div>
    </div>
  );
};

export default ProfileX;
