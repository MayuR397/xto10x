import React from "react";
import { Link } from "react-router-dom";

const InteractiveElement = () => {
  return (
    <>
      {/* Interactive Element */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Ready to Showcase Your Skills?
          </h2>
          <div className="max-w-3xl mx-auto mb-10 bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <p className="text-lg mb-6">
              Join our hackathon and get a chance to win amazing prizes worth
              10,000!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                <h3 className="font-bold text-xl mb-2">1st Prize</h3>
                <p className="text-2xl font-bold text-yellow-400">5,000</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                <h3 className="font-bold text-xl mb-2">2nd Prize</h3>
                <p className="text-2xl font-bold text-gray-300">3,000</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                <h3 className="font-bold text-xl mb-2">3rd Prize</h3>
                <p className="text-2xl font-bold text-amber-600">2,000</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register-team" onClick={() => window.scrollTo(0, 0)}>
              <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md font-bold transition transform hover:scale-105">
                Register Your Team
              </button>
            </Link>
            <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-md font-bold transition transform hover:scale-105">
              Download Brochure
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default InteractiveElement;
