import React from "react";
import { useParams } from "react-router-dom";

// Dữ liệu giả lập cho danh sách công việc
const jobs = [
  {
    id: 1,
    title: "Develop Website",
    company: "Tech Inc.",
    status: "In Progress",
    description: "Build a responsive website for Tech Inc.",
  },
  {
    id: 2,
    title: "Design Mobile App",
    company: "Creative Studio",
    status: "Completed",
    description: "Design a new mobile application for Creative Studio.",
  },
  {
    id: 3,
    title: "Database Migration",
    company: "Data Solutions",
    status: "Pending",
    description: "Migrate databases to a new platform for Data Solutions.",
  },
  {
    id: 4,
    title: "API Development",
    company: "API Masters",
    status: "In Progress",
    description: "Develop RESTful APIs for API Masters.",
  },
  {
    id: 5,
    title: "UI/UX Design",
    company: "DesignPro",
    status: "Completed",
    description: "Create UI/UX designs for various applications at DesignPro.",
  },
  // Thêm các công việc khác ở đây
];

const getStatusClass = (status) => {
  switch (status) {
    case "In Progress":
      return "bg-yellow-100 text-yellow-800";
    case "Completed":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

const ServiceManagement = () => {
  const { iduser } = useParams();
  console.log("iduser", iduser);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Danh Sách Công Việc cho Người Dùng {iduser}
      </h2>
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">{job.title}</h3>
              <p className="text-gray-600 mb-2">{job.company}</p>
              <p className="text-gray-700 mb-4">{job.description}</p>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusClass(
                  job.status
                )}`}
              >
                {job.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceManagement;
