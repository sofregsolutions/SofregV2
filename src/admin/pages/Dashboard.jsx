import React from "react";
import Sidebar from "./Sidebar";

const AdminDashboard = () => {
  return (
    <div className="flex">
        <Sidebar />

       {/* Main Content Area - This is where sub-routes will be rendered */}
      <div className="flex-grow p-2 h-[97vh]">
         {/* Main Content */}
         <div className="flex-1 bg-color-gray p-4 h-screen">
                <h1 className="text-2xl font-bold">Employee Management Dashboard</h1>
                <p>This is where your content goes!</p>

                <div className="mt-2 py-2">
                    {/* Additional Content Card */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                        <div className="flex flex-col items-center justify-center p-4 rounded-md bg-gray-800">
                            <h1 className="font-bold text-4xl">4</h1>
                            <span>Total Employee</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 rounded-md bg-gray-800">
                            <h1 className="font-bold text-4xl">4</h1>
                            <span>Absent Employee</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 rounded-md bg-gray-800">
                            <h1 className="font-bold text-4xl">4</h1>
                            <span>Most Late Employee</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 rounded-md bg-gray-800">
                            <h1 className="font-bold text-4xl">4</h1>
                            <span>No Absent Record</span>
                        </div>
                    </div>
                    {/* Additional Content Card End*/}

                    <div className="mt-4 py-2">
                        <h1 className="text-xl font-semibold">Latest Activity Today</h1>
                        <div className="w-full border py-2 p-2">
                            <span>Table content here</span>
                        </div>
                    </div>
                </div>
            </div>
       </div>
    </div>
  );
}

export default AdminDashboard;