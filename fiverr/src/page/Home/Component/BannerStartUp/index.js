import React from "react";

const BannerStartUp = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      {/* Background color to highlight content */}
      <div className="relative flex w-[1100px] h-[400px] flex-row rounded-2xl bg-white shadow-lg overflow-hidden">
        {/* Adjusted width and height, and increased border radius */}
        <div className="relative m-0 w-1/2 shrink-0 overflow-hidden bg-white text-gray-700 rounded-l-2xl">
          <img
            src="https://images.pexels.com/photos/3184307/pexels-photo-3184307.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=2"
            alt="Fiverr Startup"
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {/* Added zoom-in effect on hover */}
        </div>
        <div className="flex flex-col justify-center p-6 w-1/2 rounded-r-2xl">
          <h6 className="mb-2 font-sans text-base font-semibold uppercase text-pink-600 tracking-wide">
            Fiverr Startups
          </h6>
          <h4 className="mb-3 font-sans text-2xl font-bold text-gray-800">
            Accelerate Your Freelance Business with Fiverr's Startup Services
          </h4>
          <p className="mb-6 text-sm text-gray-600">
            Discover how Fiverr is empowering startups to scale their operations
            with top freelance talent. From digital marketing to software
            development, take advantage of Fiverr's vast pool of experts to grow
            your business.
          </p>
          <a className="inline-block mt-auto" href="#">
            <button
              className="flex items-center gap-2 rounded-full py-3 px-6 bg-pink-500 text-white text-sm font-bold uppercase transition duration-300 hover:bg-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-300"
              type="button"
            >
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BannerStartUp;
