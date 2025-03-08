// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { MyContext } from "../context/AuthContextProvider";
// const Navbar = () => {
//   const { isAuth } = useContext(MyContext);
//   return (
//     <>
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <Link to="/">
//             <div className="flex items-center">
//               <h1 className="text-3xl font-bold">
//                 <span className="text-black">xto</span>
//                 <span className="text-red-500">10x</span>
//               </h1>
//               <span className="text-gray-500 text-sm ml-2">by masai</span>
//             </div>
//           </Link>
//           <div>
//             <div className="text-xl font-semibold">
//               Hackathon <span className="text-red-500">Feb 2025</span>
//             </div>
//             <div className="text-gray-600 text-sm">
//               Code, Collaborate, Conquer!
//             </div>
//           </div>
//           <div className="flex space-x-2">
//             {isAuth && (
//               <>
//                 <Link to="/select-team">
//                   <button className="bg-white border border-red-500 text-red-500 px-4 py-2 rounded-md hover:bg-red-50 transition">
//                     Select Team
//                   </button>
//                 </Link>

//                 <Link to="/register-team">
//                   <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
//                     Register Team
//                   </button>
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </header>
//     </>
//   );
// };

// export default Navbar;

import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../context/AuthContextProvider";
import { LogOut, User, ChevronDown, Menu, X } from "lucide-react"; // Added icons
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { isAuth, setIsAuth } = useContext(MyContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Ref for detecting clicks outside the dropdown
  const profileDropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false); // Close dropdown
      }
    };

    // Add event listener when dropdown is open
    if (isProfileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userData");
    setIsAuth(false);
    toast.success("User logged out successfully", {
      position: "top-right",
    });
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold">
                <span className="text-black">xto</span>
                <span className="text-red-500">10x</span>
              </h1>
              <span className="text-gray-500 text-sm ml-2">by masai</span>
            </div>
          </Link>

          {/* Event Details - Hidden on mobile */}
          <div className="hidden md:block">
            <div className="text-xl font-semibold">
              Hackathon <span className="text-red-500">Feb 2025</span>
            </div>
            <div className="text-gray-600 text-sm">
              Code, Collaborate, Conquer!
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>

          {/* Desktop Navigation */}
          {isAuth && (
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/select-team">
                <button className="bg-white border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition">
                  Select Team
                </button>
              </Link>

              <Link to="/register-team">
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                  Register Team
                </button>
              </Link>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center justify-center bg-gradient-to-r from-gray-600 to-gray-700 text-white p-3 rounded-full hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transform hover:scale-105"
                  aria-expanded={isProfileDropdownOpen}
                  aria-haspopup="true"
                >
                  <User className="h-5 w-5 text-white" />
                  <ChevronDown
                    className={`h-4 w-4 ml-1 transition-transform duration-300 ${
                      isProfileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-500 transition"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <User className="h-4 w-4 inline mr-2" />
                      View Profile
                    </Link>
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        {
                          /* ✅ Closes dropdown on click */
                        }
                        handleLogout();
                        {
                          /* Ensures logout logic is executed */
                        }
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-500 transition flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        {isAuth && isMenuOpen && (
          <div className="md:hidden mt-4 space-y-3">
            <Link to="/select-team">
              <button className="w-full bg-white border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition">
                Select Team
              </button>
            </Link>

            <Link to="/register-team">
              <button className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                Register Team
              </button>
            </Link>

            <Link to="/profile">
              <button className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
                <User className="h-5 w-5 text-red-500" />
                <span>View Profile</span>
              </button>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              <LogOut className="h-5 w-5 text-red-500" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
