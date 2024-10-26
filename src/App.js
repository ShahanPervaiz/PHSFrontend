import React, {useState, useEffect } from "react";
import { Footer, Navbar, Sidebar, ThemeSettings } from "./components";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { ToastContainer, toast } from 'react-toastify';
import { useStateContext } from "./contexts/ContextProvider";
import Dashboard from "./pages/DashBoard/dashboard";
import Assistant from "./pages/Assistant/assistant";
import Signin from "./pages/signin/signin";
import './App.css';

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {activeMenu} = useStateContext();
  const [loading, setLoading] = useState(true);

 

  // Check authentication status on initial load
  useEffect(() => {
    console.log("App.jssss")
    const token = localStorage.getItem('token');
    if (token != null) {
      setIsAuthenticated(true);
      console.log("AcessGranted")
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="assistant" element={<Layout activeMenu={activeMenu}><Assistant /></Layout>} />
        <Route path="dashboard" element={<Layout activeMenu={activeMenu}><Dashboard /></Layout>} />

        {/* <Route path="/assistant" element={isAuthenticated ? <Layout activeMenu={activeMenu}><Assistant /></Layout> : <Navigate to="/" />} />
        <Route path="/dashboard" element={isAuthenticated ? <Layout activeMenu={activeMenu}><Dashboard /></Layout> : <Navigate to="/" />} /> */}
      </Routes>
    </BrowserRouter>
  );

};

const Layout = ({ children, activeMenu }) => {
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