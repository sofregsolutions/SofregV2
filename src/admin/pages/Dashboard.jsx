import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import AccountTable from "../components/AccountTable";
import AccountModal from "../components/AccountModal";
import Pusher from "pusher-js";
import axios from "axios";
import AttendanceTable from "../components/AttendanceTable";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState("dashboard");
    const [employeeAccountModal, setEmployeeAccountModal] = useState(false);
    const openAccountModal = () => setEmployeeAccountModal(true);
    const closeAccountModal = () => setEmployeeAccountModal(false);
    const [employeeData, setEmployeeData] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);

    const fetchEmployeeApi = "http://localhost:8001/api/admin/employee-account"
    const fetchAttendanceApi = "http://localhost:8001/api/admin/employee-attendance"
    const fetchExportAttendanceApi = "http://localhost:8001/api/admin/export-attendance"
    const data = JSON.parse(localStorage.getItem("authentication")) || {};
    useEffect(() => {
        if (!activeSection) return; // Only run when activeSection is set

        const fetchInitialData = async () => {
            try {
                if (activeSection === 'account') {
                    console.log('Fetching initial employee data...');
                    const response = await axios.get(fetchEmployeeApi, {
                        headers: {
                            'Authorization': `Bearer ${data.token}`
                        }
                    });
                    console.log('Initial employee data:', response.data);
                    setEmployeeData(response.data);
                } else if (activeSection === 'attendance') {
                    console.log('Fetching initial admin attendance data...');
                    const response = await axios.get(fetchAttendanceApi, {
                        headers: {
                            'Authorization': `Bearer ${data.token}`
                        }
                    });
                    console.log('Initial attendance data:', response.data);
                    setAttendanceData(response.data);
                }
            } catch (error) {
                console.error(`Failed to fetch ${activeSection.toLowerCase()} data:`, error.response?.data || error.message);
            }
        };

        fetchInitialData();

        // Enable pusher logging - remove this in production
        Pusher.logToConsole = true;

        const pusher = new Pusher('e353e3bea820d710bdc1', {
            cluster: 'us2',
            forceTLS: true,
            enabledTransports: ['ws', 'wss']
        });

        let channel;
        if (activeSection === 'account') {
            channel = pusher.subscribe('employee-channel');
            channel.bind('employee-event', async (event) => {
                console.log('Employee event received:', event);

                try {
                    const response = await axios.get(fetchEmployeeApi, {
                        headers: {
                            'Authorization': `Bearer ${data.token}`
                        }
                    });
                    console.log('Updated employee data:', response.data);
                    setEmployeeData(response.data);
                } catch (error) {
                    console.error('Failed to fetch updated employee data:', error);
                }
            });
        } else if (activeSection === 'attendance') {
            channel = pusher.subscribe('admin-attendance-channel');
            channel.bind('admin-attendance-event', async (event) => {
                console.log('Admin Attendance event received:', event);

                try {
                    const response = await axios.get(fetchAttendanceApi, {
                        headers: {
                            'Authorization': `Bearer ${data.token}`
                        }
                    });
                    console.log('Updated Admin attendance data:', response.data);
                    setAttendanceData(response.data);
                } catch (error) {
                    console.error('Failed to fetch updated admin attendance data:', error);
                }
            });
        }

        return () => {
            if (channel) {
                channel.unbind_all();
                channel.unsubscribe();
            }
        };
    }, [activeSection]);

    // for employee accounts
    const handlePageChangeEmployeeAccount = async (page) => {
        try {

            const response = await axios.get(`${fetchEmployeeApi}?page=${page}`, {
                headers: {
                    'Authorization': `Bearer ${data.token}`
                }
            });
            setEmployeeData(response.data);
        } catch (error) {
            console.error('Failed to fetch paginated data:', error);
        }
    };
    // for employee attendance
    const handlePageChangeEmployeeAttendance = async (page) => {
        try {

            const response = await axios.get(`${fetchAttendanceApi}?page=${page}`, {
                headers: {
                    'Authorization': `Bearer ${data.token}`
                }
            });
            setAttendanceData(response.data);
        } catch (error) {
            console.error('Failed to fetch paginated data:', error);
        }
    };

    //export attendance data to excel
    const exportAttendanceToExcel = async () => {
        try {
            const response = await axios.get(fetchExportAttendanceApi, {
                headers: { 'Authorization': `Bearer ${data.token}` }
            });
    
            console.log('Exported attendance data:', response.data);
            const attendanceData = response.data.employee_attendance.map(item => ({
                EmployeeID: item.employee_id,
                EmployeeName: item.user.name,
                Department: item.user.department,
                Position: item.user.position,
                Date: item.date,
                ClockIn: item.clock_in,
                ClockOut: item.clock_out,
                Status: item.status,
            }));
    
            const worksheet = XLSX.utils.json_to_sheet(attendanceData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');
    
            const today = new Date();
            const month = today.toLocaleString('default', { month: 'long' });
            const day = today.getDate();
            const year = today.getFullYear();
    
            const fileName = `EmployeeAttendance_${month}_${day}_${year}.xlsx`;
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
            saveAs(blob, fileName);
        } catch (error) {
            console.error('Failed to fetch and export attendance:', error);
        }
    };
    
    // console.log("Active Section", activeSection);
    const renderContent = () => {
        console.log("Rendering content for:", activeSection);
        switch (activeSection) {
            case "account":
                return (
                    <div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold">Employee Account Management</h1>
                                <p>Manage your employees account here.</p>

                            </div>
                            <div>
                                <button onClick={openAccountModal} type="button" className="border p-2">Add Employee</button>
                            </div>
                        </div>
                        <AccountTable accountData={employeeData} onPageChange={handlePageChangeEmployeeAccount} />
                    </div>
                );
            case "attendance":
                return (
                    <div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold">Attendance Tracking</h1>
                                <p>Track employee attendance based on montly.</p>
                            </div>
                            <button type="button" className="border p-1 rounded-sm" onClick={exportAttendanceToExcel}>Export Excell</button>
                        </div>
                        <AttendanceTable attendanceData={attendanceData} onPageChange={handlePageChangeEmployeeAttendance} />
                    </div>
                );
            default:
                return (
                    <div>
                        <h1 className="text-2xl font-bold">Employee Management Dashboard</h1>
                        <p>This is where your content goes!</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-2">
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
                    </div>
                );
        }
    };

    return (
        <div className="flex">
            <Sidebar onSectionClick={setActiveSection} />
            <div className="flex-grow p-2 h-[97vh]">
                <div key={activeSection} className="flex-1 bg-color-gray p-4 h-screen">
                    {renderContent()}
                </div>
            </div>

            {/* Add Employee Account Modal */}
            {employeeAccountModal && <AccountModal onClose={closeAccountModal} />}
        </div>
    );
};

export default AdminDashboard;