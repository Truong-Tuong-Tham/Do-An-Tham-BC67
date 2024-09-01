import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jobService } from "../../../../services/jobService";
import {
  Modal,
  Input,
  Form,
  Button,
  notification,
  Pagination,
  Select,
  Slider, // Import Slider for price range selection
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const JobManagement = () => {
  const { iduser } = useParams();
  const [jobData, setJobData] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const { infoUser } = useSelector((state) => state.userReducer);

  const [newJob, setNewJob] = useState({
    id: 0,
    tenCongViec: "",
    danhGia: 0,
    giaTien: 0,
    nguoiTao: infoUser.user.id,
    hinhAnh: "",
    moTa: "",
    maChiTietLoaiCongViec: 0,
    moTaNgan: "",
    saoCongViec: 0,
  });

  const [jobType, setJobType] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");

  // State for price range filter
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const fetchJobType = async () => {
    try {
      const res = await jobService.getDetailTypeJob();
      setJobType(res.data.content);
    } catch (error) {
      console.error("Error fetching job type data:", error);
    }
  };

  const fetchJobData = async () => {
    try {
      const res = await jobService.getListJobs();
      setJobData(res.data.content);
      setFilteredJobs(res.data.content);
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };

  useEffect(() => {
    fetchJobData();
    fetchJobType();
  }, []);

  useEffect(() => {
    const filtered = jobData
      .filter((job) =>
        job.tenCongViec.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter(
        (job) => job.giaTien >= priceRange[0] && job.giaTien <= priceRange[1]
      ); // Filter by price range
    setFilteredJobs(filtered);
    setCurrentPage(1);
  }, [searchQuery, priceRange, jobData]);

  const handleEditClick = async (jobId) => {
    try {
      const res = await jobService.getJobWithID(jobId);
      setSelectedJob(res.data.content);
      setIsEditModalVisible(true);
    } catch (error) {
      console.error("Error getting job for editing:", error);
    }
  };

  const handleCreateClick = () => {
    setIsCreateModalVisible(true);
  };

  const handleViewClick = async (jobId) => {
    try {
      const res = await jobService.getJobWithID(jobId);
      setSelectedJob(res.data.content);
      setIsViewModalVisible(true);
    } catch (error) {
      console.error("Error getting job for viewing:", error);
    }
  };

  const handleModalOk = async () => {
    if (!selectedJob || !selectedJob.id) {
      console.error("No job selected or job ID missing.");
      return;
    }
    try {
      await jobService.putJob(selectedJob, selectedJob.id);
      notification.success({
        message: "Job Updated",
        description: "The job has been updated successfully.",
      });
      setIsEditModalVisible(false);
      fetchJobData();
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const handleCreateJob = async () => {
    try {
      await jobService.postJob(newJob);
      notification.success({
        message: "Job Created",
        description: "The new job has been created successfully.",
      });
      setIsCreateModalVisible(false);
      fetchJobData();
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  const handleModalCancel = () => {
    setIsEditModalVisible(false);
    setIsCreateModalVisible(false);
    setIsViewModalVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? parseFloat(value) : value;
    setSelectedJob({ ...selectedJob, [name]: parsedValue });
  };

  const handleNewJobChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? parseFloat(value) : value;
    setNewJob({ ...newJob, [name]: parsedValue });
  };

  const handleDeleteClick = (jobId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this job?",
      onOk: async () => {
        try {
          await jobService.deleteJob(jobId);
          notification.success({
            message: "Job Deleted",
            description: "The job has been deleted successfully.",
          });
          fetchJobData();
        } catch (error) {
          console.error("Error deleting job:", error);
        }
      },
    });
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-8 bg-gray-50">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-4">
          Job Listings
        </h1>
        <div className="flex justify-between items-center mb-6">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-xs border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
          <div className="flex gap-4 items-center">
            <Button
              type="primary"
              onClick={handleCreateClick}
              className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-105"
            >
              Create New Job
            </Button>
            <div className="flex flex-col">
              <span className="mb-2 text-gray-700">Filter by Price:</span>
              <Slider
                range
                min={0}
                max={1000}
                step={10}
                value={priceRange}
                onChange={setPriceRange}
                marks={{ 0: "$0", 1000: "$1000" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 text-left text-gray-600 font-medium text-sm">
                Image
              </th>
              <th className="p-4 text-left text-gray-600 font-medium text-sm">
                Job Title
              </th>
              <th className="p-4 text-left text-gray-600 font-medium text-sm">
                Price
              </th>
              <th className="p-4 text-left text-gray-600 font-medium text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentJobs.map((job) => (
              <tr
                key={job.id}
                className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-300"
              >
                <td className="p-4 flex items-center">
                  <img
                    src={job.hinhAnh}
                    alt={job.tenCongViec}
                    className="w-16 h-16 object-cover rounded-lg shadow-sm"
                  />
                </td>
                <td className="p-4 text-gray-800">{job.tenCongViec}</td>
                <td className="p-4 text-gray-800">${job.giaTien.toFixed(2)}</td>
                <td className="p-4   flex justify-center items-center space-x-2">
                  <Button
                    type="link"
                    onClick={() => handleViewClick(job.id)}
                    className="text-blue-500  hover:text-blue-700"
                  >
                    View
                  </Button>
                  <Button
                    type="link"
                    onClick={() => handleEditClick(job.id)}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    Edit
                  </Button>
                  <Button
                    type="link"
                    onClick={() => handleDeleteClick(job.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          className="mt-4"
          current={currentPage}
          pageSize={jobsPerPage}
          total={filteredJobs.length}
          onChange={handlePageChange}
        />
      </div>

      {/* Edit Modal */}
      <Modal
        title="Edit Job"
        visible={isEditModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Save"
        cancelText="Cancel"
        className="modal-custom"
      >
        <Form layout="vertical">
          <Form.Item label="Job Name">
            <Input
              name="tenCongViec"
              value={selectedJob?.tenCongViec}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Job Type">
            <Select
              name="maChiTietLoaiCongViec"
              value={selectedJob?.maChiTietLoaiCongViec}
              onChange={(value) =>
                setNewJob({ ...newJob, maChiTietLoaiCongViec: value })
              }
            >
              {(() => {
                const addedIds = new Set(); // Tập hợp để theo dõi các id đã thêm
                return jobType.flatMap((type) =>
                  type.dsChiTietLoai
                    .filter((chiTiet) => {
                      if (addedIds.has(chiTiet.id)) return false; // Nếu đã thêm, bỏ qua
                      addedIds.add(chiTiet.id); // Thêm id vào tập hợp
                      return true;
                    })
                    .map((chiTiet) => (
                      <Select.Option key={chiTiet.id} value={chiTiet.id}>
                        {chiTiet.tenChiTiet}
                      </Select.Option>
                    ))
                );
              })()}
            </Select>
          </Form.Item>

          <Form.Item label="Description">
            <Input.TextArea
              name="moTa"
              value={selectedJob?.moTa}
              onChange={handleInputChange}
              rows={4}
            />
          </Form.Item>
          <Form.Item label="Image URL">
            <Input
              name="hinhAnh"
              value={selectedJob?.hinhAnh}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Short Description">
            <Input
              name="moTaNgan"
              value={selectedJob?.moTaNgan}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Rating">
            <Input
              name="saoCongViec"
              type="number"
              value={selectedJob?.saoCongViec}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Price">
            <Input
              name="giaTien"
              type="number"
              value={selectedJob?.giaTien}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Form>
      </Modal>
      {/* Create Modal */}
      <Modal
        title="Create New Job"
        visible={isCreateModalVisible}
        onOk={handleCreateJob}
        onCancel={handleModalCancel}
        okText="Create"
        cancelText="Cancel"
        className="modal-custom"
        footer={[
          <Button
            key="cancel"
            onClick={handleModalCancel}
            className="bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleCreateJob}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Create
          </Button>,
        ]}
      >
        <Form layout="vertical" className="space-y-4">
          <Form.Item label="Job Name">
            <Input
              name="tenCongViec"
              value={newJob.tenCongViec}
              onChange={handleNewJobChange}
              className="border rounded-md p-2"
            />
          </Form.Item>

          {/* Row with two inputs */}
          <div className="flex gap-4">
            <Form.Item label="Image URL" className="flex-1">
              <Input
                name="hinhAnh"
                value={newJob.hinhAnh}
                onChange={handleNewJobChange}
                className="border rounded-md p-2"
              />
            </Form.Item>
            <Form.Item label="Short Description" className="flex-1">
              <Input
                name="moTaNgan"
                value={newJob.moTaNgan}
                onChange={handleNewJobChange}
                className="border rounded-md p-2"
              />
            </Form.Item>
          </div>

          <Form.Item label="Job Type">
            <Select
              name="maChiTietLoaiCongViec"
              value={newJob.maChiTietLoaiCongViec}
              onChange={(value) =>
                setNewJob({ ...newJob, maChiTietLoaiCongViec: value })
              }
              className="border rounded-md p-2"
            >
              {(() => {
                const addedIds = new Set(); // Tập hợp để theo dõi các id đã thêm
                return jobType.flatMap((type) =>
                  type.dsChiTietLoai
                    .filter((chiTiet) => {
                      if (addedIds.has(chiTiet.id)) return false; // Nếu đã thêm, bỏ qua
                      addedIds.add(chiTiet.id); // Thêm id vào tập hợp
                      return true;
                    })
                    .map((chiTiet) => (
                      <Select.Option key={chiTiet.id} value={chiTiet.id}>
                        {chiTiet.tenChiTiet}
                      </Select.Option>
                    ))
                );
              })()}
            </Select>
          </Form.Item>

          <Form.Item label="Description">
            <Input.TextArea
              name="moTa"
              value={newJob.moTa}
              onChange={handleNewJobChange}
              rows={4}
              className="border rounded-md p-2"
            />
          </Form.Item>
          <Form.Item label="Rating">
            <Input
              name="saoCongViec"
              type="number"
              value={newJob.saoCongViec}
              onChange={handleNewJobChange}
              className="border rounded-md p-2"
            />
          </Form.Item>
          <Form.Item label="Price">
            <Input
              name="giaTien"
              type="number"
              value={newJob.giaTien}
              onChange={handleNewJobChange}
              className="border rounded-md p-2"
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* View Modal */}
      <Modal
        title="View Job"
        visible={isViewModalVisible}
        onCancel={handleModalCancel}
        footer={[
          <button
            key="ok"
            onClick={handleModalCancel}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Close
          </button>,
        ]}
        className="modal-custom"
      >
        {selectedJob && (
          <div>
            <img
              src={selectedJob.hinhAnh}
              alt={selectedJob.tenCongViec}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2">
              {selectedJob.tenCongViec}
            </h2>
            <p className="text-gray-700 mb-4">{selectedJob.moTa}</p>
            <div className="flex items-center mb-4">
              <span className="text-xl font-semibold text-gray-900 mr-4">
                ${selectedJob.giaTien}
              </span>
              <div className="flex items-center">
                <span className="text-yellow-500 text-xl">
                  {"★".repeat(selectedJob.saoCongViec)}
                </span>
                <span className="text-gray-600 ml-2">
                  ({selectedJob.danhGia} reviews)
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default JobManagement;
