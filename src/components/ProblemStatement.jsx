import React from "react";
import { Code, Database, TestTube, ChevronRight } from "lucide-react";

const ProblemStatement = () => {
  return (
    <>
      {/* Problem Statements */}
      <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Problem Statements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 hover:shadow-md transition transform hover:-translate-y-1 cursor-pointer">
            <div className="bg-blue-500 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Code size={24} />
            </div>
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Frontend
            </h3>
            <p className="text-blue-700 text-sm mb-4">
              Build innovative UI/UX solutions with modern frameworks
            </p>
            <button className="flex items-center text-blue-600 font-medium text-sm hover:text-blue-800">
              View Challenges <ChevronRight size={16} />
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200 hover:shadow-md transition transform hover:-translate-y-1 cursor-pointer">
            <div className="bg-purple-500 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Database size={24} />
            </div>
            <h3 className="text-lg font-semibold text-purple-800 mb-2">
              Data Analytics
            </h3>
            <p className="text-purple-700 text-sm mb-4">
              Extract insights from complex datasets
            </p>
            <button className="flex items-center text-purple-600 font-medium text-sm hover:text-purple-800">
              View Challenges <ChevronRight size={16} />
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200 hover:shadow-md transition transform hover:-translate-y-1 cursor-pointer">
            <div className="bg-green-500 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <TestTube size={24} />
            </div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">SDET</h3>
            <p className="text-green-700 text-sm mb-4">
              Create robust testing frameworks and automation
            </p>
            <button className="flex items-center text-green-600 font-medium text-sm hover:text-green-800">
              View Challenges <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProblemStatement;
