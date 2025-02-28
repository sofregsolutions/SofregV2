import React from "react";

const AccountTable = ({ accountData, onPageChange }) => {
    console.log(accountData)
    const data = accountData?.users?.data || [];
    const currentPage = accountData?.users?.current_page;
    const lastPage = accountData?.users?.last_page;
    return (
        <div className="relative flex flex-col w-full">
            <div className="flex-grow overflow-x-scroll overflow-y-hidden w-full bg-gray">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-bold text-color-dark uppercase">Employee ID</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-color-dark uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-color-dark uppercase">Address</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-color-dark uppercase">Contact No.</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-color-dark uppercase">Department</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-color-dark uppercase">Position</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-color-dark uppercase">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((record, index) => (
                                <tr key={record.id} className={`text-center ${index % 2 === 0 ? 'bg-gray-400' : ''}`}>
                                    <td className="p-2 whitespace-nowrap font-bold">{record.employee_id}</td>
                                    <td className="p-2 whitespace-nowrap">{record.name}</td>
                                    <td className="p-2 whitespace-nowrap">{record.address}</td>
                                    <td className="p-2 whitespace-nowrap">{record.contact_no}</td>
                                    <td className="p-2 whitespace-nowrap">{record.department}</td>
                                    <td className="p-2 whitespace-nowrap">{record.position}</td>
                                    <td className="flex gap-2 items-center justify-center p-2 whitespace-nowrap">
                                        <button type="button" className="text-xs bg-color-dark rounded-sm p-1">Edit</button>
                                        <button type="button" className="text-xs bg-red-500 rounded-sm p-1">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-gray-300">
                                    No attendance records available.
                                </td>
                            </tr>
                        )}
                        {/* <div className='w-full p-2'></div> */}
                    </tbody>
                </table>
            </div>
            {lastPage > 1 && (
                <div className="bg-color-gray w-full py-2">
                    <div className="flex phone:flex-row justify-center">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => onPageChange(currentPage - 1)}
                            className={`px-1 py-1 phone:px-4 phone:py-2 border rounded ${currentPage === 1 ? 'text-gray-400' : 'text-white hover:text-color-dark'}`}
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2 text-gray-300 text-xs phone:text-base">Page {currentPage} of {lastPage}</span>
                        <button
                            disabled={currentPage === lastPage}
                            onClick={() => onPageChange(currentPage + 1)}
                            className={`px-1 py-1 phone:px-4 phone:py-2 border rounded ${currentPage === lastPage ? 'text-gray-400' : 'text-white hover:text-color-dark'}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AccountTable;