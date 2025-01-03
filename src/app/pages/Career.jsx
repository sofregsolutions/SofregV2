import React from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProgressScrollButton from "../components/ProgressScrollButton";
import CareerHeader from "../components/Career/CareerHeader";
import SectionHeader from "../components/Career/SectionHeader";
import CareerMarqueeSection from "../components/Career/CareerMarquee";
const Career = () => {
    return (
        <div className="startup-one">
            {/* Loader */}
            <Loader />

            {/* Cursor */}
            <div className="cursor"></div>

            <ProgressScrollButton />
            {/* Navbar */}
            <Navbar />

            <Sidebar />
            <div id="smooth-content">

                <main className="main-bg">
                    <CareerHeader />
                    <SectionHeader />
                    <CareerMarqueeSection />
                </main>
            </div>

        </div>
    )
}

export default Career;