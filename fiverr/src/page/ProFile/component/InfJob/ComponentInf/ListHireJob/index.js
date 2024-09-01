import React, { useState, useEffect } from "react";
import { jobService } from "../../../../../../services/jobService";
import { Carousel, Modal, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "antd/dist/reset.css"; // Ensure Ant Design styles are imported
import { FaStar } from "react-icons/fa";

const ListHireJobs = () => {
  const [listHire, setListHire] = useState([]);
  const [activeJob, setActiveJob] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const fetchListHire = async () => {
    try {
      const res = await jobService.getListHireJobs();
      console.log(res.data.content);
      setListHire(res.data.content);
      if (res.data.content.length > 0) {
        setActiveJob(res.data.content[0]); // Set initial active job
      }
    } catch (error) {
      console.error("Error fetching list of hire jobs:", error);
    }
  };

  useEffect(() => {
    fetchListHire();
  }, []);

  const handleAfterChange = (current) => {
    setActiveJob(listHire[current]);
  };

  const handleViewClick = (job) => {
    setSelectedJob(job);
    setIsModalVisible(true);
    setShowFullDescription(false); // Reset description view when opening modal
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedJob(null);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const formatDescription = (text) => {
    return text.replace(/\r\n/g, "<br/>");
  };

  const handleDeleteJob = async () => {
    try {
      await jobService.deteleHireJob(selectedJob.id);
      setListHire(listHire.filter((job) => job.id !== selectedJob.id));
      handleCloseModal(); // Close modal after deletion
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  // Custom arrow components
  const prevArrow = (
    <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-gray-700 rounded-full p-3 shadow-lg z-20 flex items-center justify-center border border-gray-300 hover:bg-gray-200">
      <LeftOutlined className="text-2xl" />
    </button>
  );

  const nextArrow = (
    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-gray-700 rounded-full p-3 shadow-lg z-20 flex items-center justify-center border border-gray-300 hover:bg-gray-200">
      <RightOutlined className="text-2xl" />
    </button>
  );

  return (
    <section className="pt-10 lg:pt-20 pb-10 lg:pb-20 bg-white relative">
      <div className="container mx-auto px-4">
        <h4 className="text-lg text-gray-900 font-bold">ListHireJobs</h4>
        <div className="relative flex">
          {/* Carousel Section */}
          <div className="w-1/5 h-[200px]">
            <Carousel
              dots={false}
              autoplay={true}
              slidesToShow={1}
              slidesToScroll={1}
              afterChange={handleAfterChange}
              prevArrow={prevArrow}
              nextArrow={nextArrow}
              className="carousel bg-neutral rounded-box"
              style={{ height: "200px" }} // Set fixed height
            >
              {listHire.length > 0 ? (
                listHire.map((job) => (
                  <div
                    key={job.id}
                    className="carousel-item flex justify-center"
                  >
                    <div className="bg-white rounded-lg overflow-hidden h-full w-full">
                      <img
                        src={job.congViec.hinhAnh}
                        alt={job.congViec.tenCongViec}
                        className="w-full h-[200px] object-cover"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 col-span-full">
                  No jobs available for hire.
                </p>
              )}
            </Carousel>
          </div>
          {/* Details Section */}
          <div className="w-4/5 h-[200px] bg-white p-6 rounded-lg shadow-md flex flex-col overflow-hidden">
            {activeJob ? (
              <>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 truncate">
                  <span className="font-bold">Title:</span>{" "}
                  {activeJob.congViec.tenCongViec}
                </h3>
                <p className="text-sm text-gray-700 mb-2 truncate">
                  <span className="font-bold">Description:</span>{" "}
                  {activeJob.congViec.moTaNgan}
                </p>
                <p className="text-sm text-gray-700 mb-2 flex items-center">
                  {[...Array(activeJob.congViec.saoCongViec)].map(
                    (_, index) => (
                      <FaStar key={index} className="text-yellow-500" />
                    )
                  )}
                  {[...Array(5 - activeJob.congViec.saoCongViec)].map(
                    (_, index) => (
                      <FaStar
                        key={index + activeJob.congViec.saoCongViec}
                        className="text-gray-300"
                      />
                    )
                  )}
                </p>
                <p className="text-sm text-gray-700 mb-2 truncate">
                  <span className="font-bold">Hire Date:</span>{" "}
                  {new Date(activeJob.ngayThue).toLocaleDateString("en-GB")}
                </p>
                <button
                  className="mt-auto w-[100px] bg-yellow-500 text-white font-semibold py-1 px-3 rounded hover:bg-yellow-600 transition-colors duration-200"
                  onClick={() => handleViewClick(activeJob)}
                >
                  View
                </button>
              </>
            ) : (
              <p className="text-gray-500">No job selected</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal for displaying job details */}
      {selectedJob && (
        <Modal
          title="Job Details"
          visible={isModalVisible}
          onCancel={handleCloseModal}
          footer={[
            <Button key="delete" type="danger" onClick={handleDeleteJob}>
              Delete
            </Button>,
            <Button key="cancel" onClick={handleCloseModal}>
              Cancel
            </Button>,
          ]}
          width={600} // Adjusted width for a compact view
        >
          <div className="flex flex-col">
            <img
              src={selectedJob.congViec.hinhAnh}
              alt={selectedJob.congViec.tenCongViec}
              className="w-full h-[200px] object-cover mb-4 rounded-lg"
            />
            <h3 className="text-lg font-semibold mb-2 text-gray-900">
              <span className="font-bold">Title:</span>{" "}
              {selectedJob.congViec.tenCongViec}
            </h3>
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-bold">Description:</span>{" "}
              <span
                dangerouslySetInnerHTML={{
                  __html: showFullDescription
                    ? formatDescription(selectedJob.congViec.moTa)
                    : formatDescription(
                        selectedJob.congViec.moTa.substring(0, 100) + "..."
                      ),
                }}
              />
              <button
                className="ml-2 text-blue-600 hover:underline"
                onClick={toggleDescription}
              >
                {showFullDescription ? "Show Less" : "Read More"}
              </button>
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-bold">Short Description:</span>{" "}
              <span
                dangerouslySetInnerHTML={{
                  __html: formatDescription(selectedJob.congViec.moTaNgan),
                }}
              />
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-bold">Price:</span> $
              {selectedJob.congViec.giaTien}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-bold">Hire Date:</span>{" "}
              {new Date(selectedJob.ngayThue).toLocaleDateString("en-GB")}
            </p>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default ListHireJobs;
