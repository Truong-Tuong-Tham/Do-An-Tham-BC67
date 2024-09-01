import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import HeaderDetail from "../DetailJob/Component/Header";
import ListTypeJobsDetail from "../DetailJob/Component/ListType";
import ProfileDetail from "./component/ProFileDetail";
import ListHireJobs from "./component/InfJob/ComponentInf/ListHireJob";
import ActivityLog from "./component/Activity";
import Statistics from "./component/Statistics";
import Conected from "./component/Conected";
import ProfileX from "./component/ProFileXUser";

const ProFilePage = () => {
  const { infoUser } = useSelector((state) => state.userReducer);
  const { iduser } = useParams();

  return (
    <div>
      <div>
        <HeaderDetail />
        <ListTypeJobsDetail />
      </div>
      
      <div className="flex w-[95%] mx-auto p-4 border-r border-gray-200">
        {infoUser.user.id === iduser ? (
          <>
            {/* ProfileDetail takes up half the width and sticks to the top */}
            <div className="w-2/5 pr-4 sticky h-full top-0">
              <ProfileDetail iduser={iduser} />
            </div>
            {/* Combined block of components takes up the other half */}
            <div className="w-3/5 space-y-4">
              <ListHireJobs />
              <ActivityLog />
              <Statistics />
              <Conected />
            </div>
          </>
        ) : (
          // ProfileX takes up the full width
          <div className="w-[95%] mx-auto p-4 border-r border-gray-200">
            <ProfileX iduser={iduser} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProFilePage;
