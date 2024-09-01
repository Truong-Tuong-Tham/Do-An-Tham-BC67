import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jobService } from "../../../../services/jobService";
import { Card, Col, Row, Typography, Pagination } from "antd";
import "antd/dist/reset.css"; // Ensure Ant Design styles are applied
import { postMenujobsAction } from "../../../../redux/user/jobSlice";
import { useDispatch } from "react-redux";

const { Title, Text } = Typography;

const JobTypeManagement = () => {
  const { iduser } = useParams();
  const [detailTypes, setDetailTypes] = useState([]);
  const [jobCategories, setJobCategories] = useState([]);
  const dispatch = useDispatch();
  // State for pagination
  const [currentDetailPage, setCurrentDetailPage] = useState(1);
  const detailPageSize = 6;

  const [currentCategoryPage, setCurrentCategoryPage] = useState(1);
  const categoryPageSize = 6;

  useEffect(() => {
    const fetchDetailTypes = async () => {
      try {
        const response = await jobService.getDetailTypeJob();
        setDetailTypes(response.data?.content || []);
      } catch (error) {
        console.error("Error fetching detail types:", error);
      }
    };

    const fetchJobCategories = async () => {
      try {
        const response = await jobService.getTypeJob();

        setJobCategories(response.data?.content || []);
      } catch (error) {
        console.error("Error fetching job categories:", error);
      }
    };

    fetchDetailTypes();
    fetchJobCategories();
  }, []);

  const currentDetailTypes = detailTypes.slice(
    (currentDetailPage - 1) * detailPageSize,
    currentDetailPage * detailPageSize
  );
  const currentJobCategories = jobCategories.slice(
    (currentCategoryPage - 1) * categoryPageSize,
    currentCategoryPage * categoryPageSize
  );

  const handleDetailPageChange = (page) => {
    setCurrentDetailPage(page);
  };

  const handleCategoryPageChange = (page) => {
    setCurrentCategoryPage(page);
  };

  return (
    <div className="container mx-auto p-6">
     
      <div className="mb-12">
        <Title level={2} className="text-blue-600 mb-6">
          Job Type Details
        </Title>
        <div className="flex flex-col min-h-screen">
          <Row gutter={[24, 24]} align="stretch" style={{ flex: 1 }}>
            {currentDetailTypes.length > 0 ? (
              currentDetailTypes.map((type) => (
                <Col xs={24} sm={12} md={8} lg={6} key={type.id}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={type.tenNhom}
                        src={type.hinhAnh}
                        className="h-36 w-full object-cover rounded-t-lg"
                      />
                    }
                    className="shadow-lg rounded-lg flex flex-col h-full"
                    style={{ minHeight: "300px" }} // Ensure consistent height
                  >
                    <Title level={4} className="text-center mt-2 flex-grow">
                      {type.tenNhom}
                    </Title>
                    <Text className="text-center block mb-2">
                      <strong>Details:</strong>
                    </Text>
                    {type.dsChiTietLoai.map((detail) => (
                      <Text key={detail.id} className="block text-center">
                        - {detail.tenChiTiet}
                      </Text>
                    ))}
                  </Card>
                </Col>
              ))
            ) : (
              <Col
                span={24}
                className="flex items-center justify-center"
                style={{ minHeight: "300px" }}
              >
                <Text>No job types found.</Text>
              </Col>
            )}
            {/* Add empty Cols to maintain layout consistency */}
            {currentDetailTypes.length % 6 !== 0 &&
              Array.from({ length: 6 - (currentDetailTypes.length % 6) }).map(
                (_, index) => (
                  <Col
                    xs={24}
                    sm={12}
                    md={8}
                    lg={6}
                    key={`empty-${index}`}
                    className="hidden md:block"
                  >
                    <div className="h-full" />
                  </Col>
                )
              )}
          </Row>
          <Pagination
            className="mt-6 flex justify-center"
            current={currentDetailPage}
            pageSize={detailPageSize}
            total={detailTypes.length}
            onChange={handleDetailPageChange}
          />
        </div>
      </div>

      <div>
        <Title level={2} className="text-blue-600 mb-6">
          Job Categories
        </Title>
        <div className="flex flex-col min-h-screen">
          <Row gutter={[24, 24]} align="stretch" style={{ flex: 1 }}>
            {currentJobCategories.length > 0 ? (
              currentJobCategories.map((category) => (
                <Col xs={24} sm={12} md={8} lg={6} key={category.id}>
                  <Card
                    className="shadow-lg rounded-lg flex flex-col h-full p-4"
                    style={{ minHeight: "300px" }} // Ensure consistent height
                  >
                    <Title level={4} className="text-center flex-grow">
                      {category.tenLoaiCongViec}
                    </Title>
                  </Card>
                </Col>
              ))
            ) : (
              <Col
                span={24}
                className="flex items-center justify-center"
                style={{ minHeight: "300px" }}
              >
                <Text>No job categories found.</Text>
              </Col>
            )}
            {/* Add empty Cols to maintain layout consistency */}
            {currentJobCategories.length % 6 !== 0 &&
              Array.from({ length: 6 - (currentJobCategories.length % 6) }).map(
                (_, index) => (
                  <Col
                    xs={24}
                    sm={12}
                    md={8}
                    lg={6}
                    key={`empty-${index}`}
                    className="hidden md:block"
                  >
                    <div className="h-full" />
                  </Col>
                )
              )}
          </Row>
          <Pagination
            className="mt-6 flex justify-center"
            current={currentCategoryPage}
            pageSize={categoryPageSize}
            total={jobCategories.length}
            onChange={handleCategoryPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default JobTypeManagement;
