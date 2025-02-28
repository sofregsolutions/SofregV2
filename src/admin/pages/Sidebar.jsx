import React from "react";
import { useLocation, Link } from "react-router-dom";
const Sidebar = ({onSectionClick}) => {
    const location = useLocation();  // Get the current location (path)
    const currentPath = location.pathname;  // Get the current route path
  
    const handleLogout = async () => {
      const token = localStorage.getItem("authToken");
      const apiEndpoint = "http://localhost:8001/api/logout";
  
      const shouldClearToken = await logout(apiEndpoint, token);
  
    };
  
    const navItems = [
      { id: "dashboard", section:"dashboard", label: "Dashboard", icon: "fas fa-home", url: "#" },
      { id: "account", section:"account", label: "Employee", icon: "fas fa-user", url: "#" },
      { id: "attendance", section:"attendance", label: "Attendance", icon: "fas fa-clock", url: "#" },
    ];
  
    return (
      <div className="bg-gray-800 text-white h-screen p-4 transition-all duration-300 w-16 tablet:w-64 flex flex-col items-center tablet:items-start">
        {/* Logo */}
        <div className="mb-6 flex flex-col items-center justify-center w-full">
          <img src="/assets/PNG/LOGO_WHITE.png" className="w-full tablet:w-16" alt="Logo" />
          {/* <span>Sofreg Solutions</span> */}
        </div>
  
        {/* Menu Items */}
        <nav className="space-y-4 w-full h-screen p-2 relative">
          <div className="w-full border-b-2 border-slate-700 mb-4">
            <span className="text-slate-500 hidden tablet:inline-block">Menu</span>
          </div>
  
          {/* Render Navigation Items */}
          {navItems.map((item) => (
            <Link
              onClick={() => {
                console.log("Clicked", item.section);
                onSectionClick(item.section)}}
              to={item.url}
              key={item.id}
              className={`flex items-center gap-2 space-x-3 tablet:space-x-0 tablet:block cursor-pointer hover:text-white ${
                currentPath === item.url ? "text-white" : "text-gray-400"
              }`}
            >
              <i className={`${item.icon} text-2xl tablet:text-xl`}></i>
              <span className="ps-2 text-xl hidden tablet:inline-block">{item.label}</span>
            </Link>
          ))}
  
          {/* Logout Button */}
          <button
            className="absolute bottom-0 flex items-center gap-2 space-x-3 tablet:space-x-0 tablet:block text-red-400 cursor-pointer hover:text-red-500"
          >
            <i className="fas fa-sign-out-alt text-2xl tablet:text-xl"></i>
            <span className="ps-2 text-xl hidden tablet:inline-block">Logout</span>
          </button>
        </nav>
      </div>
    );
  };
  
  export default Sidebar;
