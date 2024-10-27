import React, { useState } from "react";
import { Footer, Navbar, Sidebar } from "./components";
import { ToastContainer } from "react-toastify"; // Assuming you are using react-toastify

const Layout = ({ children, activeMenu }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex relative dark:bg-main-dark-bg">
      {/* Sidebar */}
      {activeMenu ? (
        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white z-10">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0 dark:bg-secondary-dark-bg">
          <Sidebar />
        </div>
      )}

      {/* Main content area */}
      <div
        className={
          activeMenu
            ? "dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full"
            : "bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2"
        }
      >
        {/* Navbar - Changed to sticky */}
        <div className="sticky top-0 dark:bg-secondary-dark-bg bg-white  w-full z-50">
          <Navbar />
        </div>

        {/* Main content */}
        <div className="">{children}</div>
        <ToastContainer />
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Layout;
