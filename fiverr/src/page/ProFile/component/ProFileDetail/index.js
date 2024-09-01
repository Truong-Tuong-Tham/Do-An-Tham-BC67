import React, { useEffect } from "react";
import CardInF from "./ComponentProFile/CardProF";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Inf from "./ComponentProFile/ProfileDetail";

const PFDetail = ({ iduser }) => {
  const { infoUser } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  console.log("infoUser", infoUser);

  useEffect(() => {
    if (!infoUser) {
      navigate("/");
    }
  }, [infoUser, navigate]);

  return (
    <div className="w-full mx-auto min-h-screen flex flex-col md:flex-row items-center justify-center p-6 bg-gray-100 space-y-6 md:space-y-0 md:space-x-6">
      <div className="flex flex-col w-full md:w-1/2">
        <CardInF idUser={iduser} />
      </div>
      <div className="flex flex-col  w-full md:w-1/2">
        {infoUser ? (
          <Inf info={infoUser.user} />
        ) : (
          <p className="text-gray-600">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default PFDetail;
