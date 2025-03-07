import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold">
              <span className="text-black">xto</span>
              <span className="text-red-500">10x</span>
            </h1>
            <span className="text-gray-500 text-sm ml-2">by masai</span>
          </div>
          <div>
            <div className="text-xl font-semibold">
              Hackathon <span className="text-red-500">Feb 2025</span>
            </div>
            <div className="text-gray-600 text-sm">
              Code, Collaborate, Conquer!
            </div>
          </div>
          <div className="flex space-x-2">
            <Link to="/select-team">
              <button className="bg-white border border-red-500 text-red-500 px-4 py-2 rounded-md hover:bg-red-50 transition">
                Select Team
              </button>
            </Link>

            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
              Register Team
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
