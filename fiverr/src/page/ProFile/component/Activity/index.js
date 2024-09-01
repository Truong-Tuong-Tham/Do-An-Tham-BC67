import React from 'react';

const ActivityLog = () => {
  return (
    <div className="flex-1 bg-white rounded-lg shadow-xl mt-2 p-3">
      <h4 className="text-lg text-gray-900 font-bold">Activity log</h4>
      <div className="relative px-2">
        <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>

        {/* Start::Timeline item */}
        <div className="flex items-center w-full my-2 -ml-1">
          <div className="w-1/12 z-10">
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
          </div>
          <div className="w-11/12">
            <p className="text-xs">Profile informations changed.</p>
            <p className="text-[10px] text-gray-500">3 min ago</p>
          </div>
        </div>
        {/* End::Timeline item */}

        {/* Start::Timeline item */}
        <div className="flex items-center w-full my-2 -ml-1">
          <div className="w-1/12 z-10">
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
          </div>
          <div className="w-11/12">
            <p className="text-xs">
              Connected with <a href="#" className="text-blue-600 font-bold">Colby Covington</a>.
            </p>
            <p className="text-[10px] text-gray-500">15 min ago</p>
          </div>
        </div>
        {/* End::Timeline item */}

        {/* Start::Timeline item */}
        <div className="flex items-center w-full my-2 -ml-1">
          <div className="w-1/12 z-10">
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
          </div>
          <div className="w-11/12">
            <p className="text-xs">
              Invoice <a href="#" className="text-blue-600 font-bold">#4563</a> was created.
            </p>
            <p className="text-[10px] text-gray-500">57 min ago</p>
          </div>
        </div>
        {/* End::Timeline item */}

        {/* Start::Timeline item */}
        <div className="flex items-center w-full my-2 -ml-1">
          <div className="w-1/12 z-10">
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
          </div>
          <div className="w-11/12">
            <p className="text-xs">
              Message received from <a href="#" className="text-blue-600 font-bold">Cecilia Hendric</a>.
            </p>
            <p className="text-[10px] text-gray-500">1 hour ago</p>
          </div>
        </div>
        {/* End::Timeline item */}

        {/* Start::Timeline item */}
        <div className="flex items-center w-full my-2 -ml-1">
          <div className="w-1/12 z-10">
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
          </div>
          <div className="w-11/12">
            <p className="text-xs">
              New order received <a href="#" className="text-blue-600 font-bold">#OR9653</a>.
            </p>
            <p className="text-[10px] text-gray-500">2 hours ago</p>
          </div>
        </div>
        {/* End::Timeline item */}

        {/* Start::Timeline item */}
        <div className="flex items-center w-full my-2 -ml-1">
          <div className="w-1/12 z-10">
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
          </div>
          <div className="w-11/12">
            <p className="text-xs">
              Message received from <a href="#" className="text-blue-600 font-bold">Jane Stillman</a>.
            </p>
            <p className="text-[10px] text-gray-500">2 hours ago</p>
          </div>
        </div>
        {/* End::Timeline item */}
      </div>
    </div>
  );
};

export default ActivityLog;
