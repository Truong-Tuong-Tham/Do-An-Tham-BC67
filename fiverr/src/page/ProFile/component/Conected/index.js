import React, { useEffect, useState } from "react";
import { userService } from "../../../../services/userService";
import { useNavigate } from "react-router-dom";

const Conected = () => {
  const [listConected, setListConected] = useState([]);
  const [loading, setLoading] = useState(true);
  const defaultAvatarFemale =
    "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611731.jpg?w=740&t=st=1725095976~exp=1725096576~hmac=693722cc51a56ac9b361515cbd6053de90fbe5f8c0c21f50653dd6bc67e3c001";
const navigate = useNavigate();
  // Fetch the list of connected users
  const fetchListConected = async () => {
    try {
      const res = await userService.getListUser();
      console.log("API Response:", res); // Debug the entire response
      console.log("API Data:", res.data.content); // Debug the data part of the response
      setListConected(Array.isArray(res.data.content) ? res.data.content : []); // Ensure it's an array
    } catch (error) {
      console.error("Error fetching connected users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListConected();
  }, []);

  if (loading) return <div>Loading...</div>;

  // Limit the list to 10 users for rendering
  const displayedUsers = listConected.slice(0, 10);

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <div className="flex items-center justify-between">
        <h4 className="text-xl text-gray-900 font-bold">
          Connections ({listConected.length})
        </h4>
        <a href="#" title="View All">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500 hover:text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-8 mt-8">
        {displayedUsers.map((user) => (
          <a
            key={user.id}
            onClick={() => navigate(`/profile/${user.id}`)}
            className="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600"
            title="View Profile"
          >
            <img
              src={user.avatar || defaultAvatarFemale}
              className="w-16 rounded-full"
              alt={user.name}
            />
            <p className="text-center font-bold text-sm mt-1">{user.name}</p>
            <p className="text-xs text-gray-500 text-center">{user.role}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Conected;
