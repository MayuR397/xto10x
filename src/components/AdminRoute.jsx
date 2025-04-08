import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { MyContext } from "../context/AuthContextProvider";
import { toast } from "react-toastify";

function AdminRoute({ children }) {
  const { isAuth, loading, userData } = useContext(MyContext);
  const location = useLocation();

  useEffect(() => {
    if (!loading && isAuth && userData?.role !== "admin") {
      toast.error("Access Denied: You are not an admin");
    }
  }, [loading, isAuth, userData]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isAuth || userData?.role !== "admin") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // console.log(
  //   "AdminRoute: isAuth =",
  //   isAuth,
  //   ", role =",
  //   userData?.role,
  //   ", path =",
  //   location.pathname
  // );

  return children;
}

export default AdminRoute;
