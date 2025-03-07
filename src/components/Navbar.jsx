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


import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../context/AuthContextProvider";
import { LogOut } from "lucide-react"; // Import logout icon
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { isAuth, setIsAuth } = useContext(MyContext);
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("userId"); // Clear user data
    setIsAuth(false); // Update context state
    toast.success("User logged out successfully", {
      position: "top-right",
    });
    navigate("/login"); // Redirect to login page
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold">
                <span className="text-black">xto</span>
                <span className="text-red-500">10x</span>
              </h1>
              <span className="text-gray-500 text-sm ml-2">by masai</span>
            </div>
          </Link>

          {/* Event Details */}
          <div>
            <div className="text-xl font-semibold">
              Hackathon <span className="text-red-500">Feb 2025</span>
            </div>
            <div className="text-gray-600 text-sm">
              Code, Collaborate, Conquer!
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 items-center">
            {isAuth && (
              <>
                <Link to="/select-team">
                  <button className="bg-white border border-red-500 text-red-500 px-4 py-2 rounded-md hover:bg-red-50 transition">
                    Select Team
                  </button>
                </Link>

                <Link to="/register-team">
                  <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                    Register Team
                  </button>
                </Link>

                {/* Cute Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-200 transition"
                >
                  <LogOut className="h-5 w-5 text-red-500" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
