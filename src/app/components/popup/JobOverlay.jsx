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
                            <span className="phone:text-xl">  Interested candidates should send their resume and portfolio by clicking the button below. </span>
                            <span className="phone:text-xl">  Applications will be reviewed on a rolling basis until the positions are filled. </span>
                            <a href="mailto:sofreginfo@gmail.com" className="hover:text-color-primary-blue cursor-pointer border w-fit p-2 rounded-sm">sofreginfo@gmail.com</a>
                        
                            {/* <span className="bg-[#181616] p-2 rounded-sm">
                                <form action="#" method="post" className="flex flex-col gap-2">
                                    <span className="phone:text-xl font-bold text-color-primary-blue">Apply as {details.title}</span>
                                    <span className="flex flex-col">
                                        <label htmlFor="name">Name</label>
                                        <input
                                                id="form_name"
                                                type="text"
                                                name="name"
                                                placeholder="Name"
                                                className="p-2 text-color-dark rounded-sm"
                                                // value={userInfo.name}
                                                // onChange={handleInputChange}
                                                
                                            />
                                    </span>
                                    <span className="flex flex-col">
                                        <label htmlFor="name">Address</label>
                                        <input
                                                id="form_address"
                                                type="text"
                                                name="address"
                                                placeholder="Address"
                                                className="p-2 text-color-dark rounded-sm"
                                                // value={userInfo.name}
                                                // onChange={handleInputChange}
                                                
                                            />
                                    </span>
                                    <span className="flex flex-col">
                                        <label htmlFor="name">Contact No.</label>
                                        <input
                                                id="form_contact"
                                                type="text"
                                                name="contact_no"
                                                placeholder="Contact Number"
                                                className="p-2 text-color-dark rounded-sm"
                                                // value={userInfo.name}
                                                // onChange={handleInputChange}
                                                
                                            />
                                    </span>
                                    <span className="flex flex-col">
                                        <label htmlFor="name">Resume/CV</label>
                                        <input
                                                id="form_resume"
                                                type="file"
                                                name="resume"
                                                placeholder="Resume/CV"
                                                className="p-2 rounded-sm"
                                                // value={userInfo.name}
                                                // onChange={handleInputChange}
                                                
                                            />
                                    </span>
                                    <span className="flex flex-col">
                                        <label htmlFor="name">Portfolio</label>
                                        <input
                                                id="form_resume"
                                                type="file"
                                                name="resume"
                                                placeholder="Resume/CV"
                                                className="p-2 rounded-sm"
                                                // value={userInfo.name}
                                                // onChange={handleInputChange}
                                                
                                            />
                                    </span>

                                    <button type="submit" className="border p-2">Apply Now.</button>
                                </form>
                            </span> */}
                        </span>
                    </div>
                </span>

            </div>

        </div>
    )
}

export default JobOverlay