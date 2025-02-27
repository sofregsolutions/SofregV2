import React from "react";
import Loader from "../../app/components/Loader";
import ProgressScrollButton from "../../app/components/ProgressScrollButton";
import EmployeeNavbar from "../components/EmployeeNavbar";
import EmployeeSidebar from "../components/EmployeeSidebar";
import EmployeeHeader from "../components/Header";

const EmployeeDashboard = () => {
  return (
    <div className="startup-one overflow-hidden">
      <Loader />
       {/* Cursor */}
       <div className="cursor"></div>

        {/* Progress Scroll Button */}
        <ProgressScrollButton />
        <EmployeeNavbar />
        <EmployeeSidebar />

        <div id="smooth-content" className="overflow-hidden">

            <EmployeeHeader />
        </div>

        
    </div>
  );
}

export default EmployeeDashboard;