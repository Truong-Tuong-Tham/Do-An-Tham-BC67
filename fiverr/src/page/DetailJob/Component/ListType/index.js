import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postMenujobsAction } from "../../../../redux/user/jobSlice";
import { jobService } from "../../../../services/jobService";
import { Dropdown, Menu, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const ListTypeJobsDetail = () => {
  const { idjob } = useParams();
  const dispatch = useDispatch();
  const { menuJobs } = useSelector((state) => state.jobReducer);
  const navigate = useNavigate();

  // Local state to manage loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Reference for horizontal scrolling container
  const scrollContainerRef = useRef(null);

  // Fetch menu jobs from the server
  const fetchMenuJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await jobService.getMenuJob();
      dispatch(postMenujobsAction(res.data.content));
    } catch (err) {
      setError("Failed to fetch menu jobs. Please try again later.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Render menu for each job type
  const renderMenu = (dsNhomChiTietLoai, itemId) => (
    <Menu>
      {dsNhomChiTietLoai.map((nhom) => (
        <React.Fragment key={`group-${nhom.id}`}>
          <Menu.Item>
            <span
              onClick={() =>
                navigate(`/detail/jobs/${itemId}/listjobs/${nhom.id}`)
              }
              className="font-semibold text-gray-700 hover:text-gray-900"
            >
              {nhom.tenNhom}
            </span>
          </Menu.Item>
          {nhom.dsChiTietLoai.map((chiTiet) => (
            <Menu.Item key={chiTiet.id}>
              <span
                onClick={() =>
                  navigate(`/detail/jobs/${itemId}/listjobs/${chiTiet.id}`)
                }
                className="pl-4 font-light text-gray-600 hover:text-gray-800"
              >
                {chiTiet.tenChiTiet}
              </span>
            </Menu.Item>
          ))}
          <Menu.Divider />
        </React.Fragment>
      ))}
    </Menu>
  );

  // Render list of menu jobs
  const renderMenuJobs = () => {
    if (menuJobs && menuJobs.length > 0) {
      return menuJobs.map((item) => (
        <li
          key={item.id}
          className="flex items-center justify-center p-2 m-2 bg-white border border-gray-200 rounded-lg shadow-md h-12 whitespace-nowrap overflow-hidden"
        >
          <Dropdown
            overlay={renderMenu(item.dsNhomChiTietLoai, item.id)}
            placement="bottomCenter"
          >
            <div className="text-center cursor-pointer">
              <div className="relative flex items-center">
                <div className="flex-grow border-t border-gray-300" />
                <span className="px-4 text-sm font-semibold text-gray-800">{item.tenLoaiCongViec}</span>
                <div className="flex-grow border-t border-gray-300" />
              </div>
            </div>
          </Dropdown>
        </li>
      ));
    }
    return <p className="text-gray-600">No jobs available</p>;
  };

  // Fetch menu jobs when the component mounts
  useEffect(() => {
    fetchMenuJobs();
  }, []);

  // Show loading spinner if data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center py-10 bg-gray-100">
        <Spin size="large" />
      </div>
    );
  }

  // Show error message if there is an error
  if (error) {
    return (
      <div className="flex justify-center py-10 bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div
        ref={scrollContainerRef}
        className="flex flex-nowrap overflow-x-auto w-full max-w-7xl mx-auto space-x-4 py-2 px-4"
        style={{
          scrollbarWidth: "none", // For Firefox
          msOverflowStyle: "none" // For Internet Explorer and Edge
        }}
      >
        {renderMenuJobs()}
      </div>
      {/* Hide scrollbar for WebKit browsers */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ListTypeJobsDetail;
