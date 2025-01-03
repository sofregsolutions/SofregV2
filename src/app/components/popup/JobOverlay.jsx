import React from "react";
import { formatDistanceToNow } from 'date-fns';

const JobOverlay = ({ details, onClose }) => {
    if (!details) return null; // If details are not available, do not render the modal.

    console.log(details)
    return (
        <div
            id="image-viewer"
            className="fixed overflow-x-hidden inset-0 bg-black bg-opacity-50 z-[9999] flex justify-center items-center zoomout"
        >
            <div className="p-4 rounded-lg">

                <span className="">
                    <div className="p-2 flex flex-col">


                        <span className="w-full laptop:w-[50%] p-10 py-6 flex flex-col phone:flex-row laptop:items-center gap-4 bg-[#1d1d1d] relative zoomout">
                            <span
                                id="preview-close"
                                className="absolute z-[9999] top-10 right-10  text-white text-5xl cursor-pointer hover:text-red-500"
                                onClick={onClose}
                            >
                                &times;
                            </span>

                            <span className="w-20 laptop:w-24 rounded-sm">
                                <img src="/assets/PNG/LOGO_WHITE.png" className="bg-color-primary-blue p-2" alt="" />
                            </span>

                            <span className="flex flex-col w-full">
                                <span className="text-2xl laptop:text-3xl font-bold">
                                    {details.title}
                                </span>
                                <span className="text-sm">
                                    {details.address}
                                </span>
                                <span className="text-xs text-gray-500">• {formatDistanceToNow(new Date(details.date), { addSuffix: true })}</span>
                                <span className="text-sm border w-fit px-1 mt-2 rounded-sm">Full-Time</span>
                            </span>


                        </span>

                        <span className="w-full laptop:w-[50%] p-10 py-6 flex flex-col gap-3 bg-[#1d1d1d] h-[400px] overflow-y-auto">
                            <span className="flex-1 text-xl font-bold text-color-primary-blue"><i className="fas fa-clipboard-list text-xl"></i> Job Description: </span>
                            <span className="phone:text-xl text-gray-300">{details.description}</span>
                            <span className="flex-1 text-xl font-bold text-color-primary-blue"><i className="fas fa-check-circle text-color-primary-blue text-xl"></i> Key Responsibilities: </span>
                            <span className="flex flex-col gap-2 phone:text-xl">
                                {details.responsibilities.map((item) => (
                                    <span><span className=""><i class="fa-solid fa-circle text-xs text-color-primary-blue"></i></span> {item}</span>
                                ))}
                            </span>

                            <span className="phone:text-xl"> Join our team and be a part of a forward-thinking company that values innovation and creativity!</span>
                            <span className="phone:text-xl">  Interested candidates should send their resume and portfolio to <a href="mailto:sofreginfo@gmail.com" className="text-color-primary-blue cursor-pointer">[sofreginfo@gmail.com]</a> . Applications will be reviewed on a rolling basis until the positions are filled.</span>
                        </span>
                    </div>
                </span>

            </div>

        </div>
    )
}

export default JobOverlay