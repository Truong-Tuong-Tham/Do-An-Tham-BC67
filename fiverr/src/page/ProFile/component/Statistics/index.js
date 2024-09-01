import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const Statistics = () => {
  useEffect(() => {
    const DATA_SET_VERTICAL_BAR_CHART_1 = [3410, 2670, 4220, 3720, 4800, 5100, 4300, 4700, 4900, 5100, 5400, 5600];
    const labels_vertical_bar_chart = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dataVerticalBarChart = {
      labels: labels_vertical_bar_chart,
      datasets: [
        {
          label: 'Earnings ($)',
          data: DATA_SET_VERTICAL_BAR_CHART_1,
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
        }
      ]
    };

    const configVerticalBarChart = {
      type: 'bar',
      data: dataVerticalBarChart,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 12
              },
              color: '#4B5563' // Tailwind Gray-600
            }
          },
          title: {
            display: true,
            text: 'Earnings in the Last 12 Months',
            font: {
              size: 16,
              weight: 'bold',
            },
            color: '#111827' // Tailwind Gray-900
          }
        },
        scales: {
          y: {
            ticks: {
              color: '#6B7280', // Tailwind Gray-500
              font: {
                size: 10,
              },
            },
            grid: {
              color: '#D1D5DB', // Tailwind Gray-300
            }
          },
          x: {
            ticks: {
              color: '#6B7280', // Tailwind Gray-500
              font: {
                size: 10,
              },
            },
            grid: {
              color: '#D1D5DB', // Tailwind Gray-300
            }
          }
        }
      },
    };

    new Chart(
      document.getElementById('verticalBarChart'),
      configVerticalBarChart
    );
  }, []);

  return (
    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-6">
      <h4 className="text-lg text-gray-900 font-bold">Statistics</h4>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-4">
        <div className="px-4 py-4 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-indigo-600">Earnings</span>
            <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">Last 7 days</span>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div>
              <svg className="w-10 h-10 p-2 bg-indigo-400 bg-opacity-20 rounded-full text-indigo-600 border border-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-end">
                <span className="text-xl 2xl:text-2xl font-bold">$1,240</span>
                <div className="flex items-center ml-1 mb-1">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                  <span className="font-bold text-xs text-gray-500 ml-0.5">5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-4 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-green-600">Completed Orders</span>
            <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">Last 7 days</span>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div>
              <svg className="w-10 h-10 p-2 bg-green-400 bg-opacity-20 rounded-full text-green-600 border border-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-end">
                <span className="text-xl 2xl:text-2xl font-bold">32</span>
                <div className="flex items-center ml-1 mb-1">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                  <span className="font-bold text-xs text-gray-500 ml-0.5">2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-4 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-blue-600">New Clients</span>
            <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">Last 7 days</span>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div>
              <svg className="w-10 h-10 p-2 bg-blue-400 bg-opacity-20 rounded-full text-blue-600 border border-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-end">
                <span className="text-xl 2xl:text-2xl font-bold">15</span>
                <div className="flex items-center ml-1 mb-1">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                  <span className="font-bold text-xs text-gray-500 ml-0.5">3%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-4 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-red-600">Client Feedback</span>
            <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">Recent</span>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div>
              <svg className="w-10 h-10 p-2 bg-red-400 bg-opacity-20 rounded-full text-red-600 border border-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 2a10 10 0 11-10 10A10 10 0 0112 2zm0 16.9a6.9 6.9 0 100-13.8 6.9 6.9 0 000 13.8z"></path></svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-end">
                <span className="text-xl 2xl:text-2xl font-bold">4.7</span>
                <div className="flex items-center ml-1 mb-1">
                  <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8l3 7h-6l3-7z"></path></svg>
                  <span className="font-bold text-xs text-gray-500 ml-0.5">Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <canvas id="verticalBarChart" className="w-full h-80"></canvas>
      </div>
    </div>
  );
};

export default Statistics;
